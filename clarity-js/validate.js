const _ = require('underscore')

function validate (program) {
  const errors = []
  try {
    const context = { errors, program }
    validateProgram(program, context)
    validateUnique(program.definitions, 'id', context)
    program.definitions.forEach(d => {
      const definitionContext = { errors, program, definition: d }
      validateDefinition(d, definitionContext)
    })
  } catch (e) {
    console.log(e)
  }
  return errors
}

function requiredProps (obj, props, context) {
  props.forEach(p => {
    if (_.property(p)(obj) === undefined) {
      context.errors.push(`Missing property: ${p}`)
    }
  })
}

function oneOf (val, options, context) {
  if (!_.includes(options, val)) {
    context.errors.push(`${val} not allowed as a value`)
  }
}

function validateUnique (items, key, context) {
  const ids = items.map(i => i[key])
  if (_.uniq(ids).length !== items.length) {
    context.errors.push(`Duplicate ids`)
  }
}

function validateProgram (program, context) {
  requiredProps(program, ['definitions'], context)
}

function validateDefinition (d, context) {
  const props = ['type', 'id', 'name', 'description', 'domainParams', 'valueParams', 'domain', 'body']
  const paramRefs = {
    value: [],
    domain: []
  }
  requiredProps(d, props, context)
  validateDomainParams(d.domainParams, context)
  validateValueParams(d.valueParams, paramRefs, context)
  validateDomain(d.domain, paramRefs, context)
  validateValue(d.body, paramRefs, context)
  validateParamRefs(d.valueParams, 'value', paramRefs, context)
  validateParamRefs(d.domainParams, 'domain', paramRefs, context)
  valueDomainMatch(d.body, d.domain, context, true)
}

function validateValueParams (params, paramRefs, context) {
  const props = ['id', 'name', 'description', 'domain']
  params.forEach(param => {
    requiredProps(param, props, context)
    validateDomain(param.domain, paramRefs, context)
  })
  validateUnique(params, 'id', context)
}

function validateDomainParams (params, context) {
  const props = ['id', 'name', 'description']
  params.forEach(param => {
    requiredProps(param, props, context)
  })
  validateUnique(params, 'id', context)
}

function validateDomain (domain, paramRefs, context) {
  validateVariable(domain, 'domain', paramRefs, context)
}

function validateValue (value, paramRefs, context) {
  validateVariable(value, 'value', paramRefs, context)
  if (!value.variable) {
    const v = value.v
    requiredProps(v, ['type'], context)
    oneOf(v.type, ['application', 'ifelse', 'integer-literal', 'string-literal', 'bool-literal', 'complex-literal', 'definition-literal'], context)
    if (v.type === 'application') {
      validateApplication(v, paramRefs, context)
    }
    if (v.type === 'ifelse') {
      validateIfelse(v, paramRefs, context)
    }
  }
}

function validateApplication (app, paramRefs, context) {
  const props = ['definition', 'valueArgs', 'domainArgs']
  requiredProps(app, props, context)
  const def = _.find(context.program.definitions, d => d.id === app.definition)
  if (def === undefined) {
    context.errors.push('Referenced definition not defined')
  }
  validateDomainArgs(app.domainArgs, def, paramRefs, context)
  validateValueArgs(app.domainArgs, app.valueArgs, def, paramRefs, context)
}

function validateDomainArgs (args, definition, paramRefs, context) {
  const props = ['param', 'domain']
  args.forEach(arg => {
    requiredProps(arg, props, context)
    const domainDef = _.find(definition.domainParams, d => d.id === arg.param)
    if (domainDef === undefined) {
      context.errors.push('Referenced domain param not defined')
    }
    validateDomain(arg.domain, paramRefs, context)
  })
}

function validateValueArgs (domainArgs, valueArgs, definition, paramRefs, context) {
  const props = ['param', 'value']
  valueArgs.forEach(arg => {
    requiredProps(arg, props, context)
    const valueDef = _.find(definition.valueParams, d => d.id === arg.param)
    if (valueDef === undefined) {
      context.errors.push('Referenced value param not defined')
    }
    validateValue(arg.value, paramRefs, context)
    // If this application specified a domain, make sure to use the applied domain
    const appliedDomain = getAppliedDomain(valueDef.domain, domainArgs)
    valueDomainMatch(arg.value, appliedDomain, context)
  })
}

function getAppliedDomain (definitionDomain, domainArgs) {
  const appliedDomain = definitionDomain.variable && _.find(domainArgs, domainArg => domainArg.param === definitionDomain.p)
  return (appliedDomain && appliedDomain.domain) || definitionDomain
}

function validateIfelse (ifelse, paramRefs, context) {
  const props = ['domain', 'condition', 'if', 'else']
  requiredProps(ifelse, props, context)
  validateDomain(ifelse.domain, paramRefs, context)
  validateValue(ifelse.condition, paramRefs, context)
  validateValue(ifelse.if, paramRefs, context)
  validateValue(ifelse.else, paramRefs, context)
  if (getValueDomainName(ifelse.condition, context) !== 'bool') {
    context.errors.push('If/else condition is not boolean')
  }
  valueDomainMatch(ifelse.if, ifelse.domain, context, true)
  valueDomainMatch(ifelse.else, ifelse.domain, context, true)
}

function validateVariable (item, paramType, paramRefs, context) {
  requiredProps(item, ['variable'], context)
  if (item.variable) {
    requiredProps(item, ['p'], context)
    paramRefs[paramType].push(item.p)
  } else {
    requiredProps(item, ['v'], context)
  }
}

function validateParamRefs (params, paramType, paramRefs, context) {
  const paramIds = params.map(param => param.id)
  if (_.difference(paramRefs[paramType], paramIds).length !== 0) {
    context.errors.push('Referenced param(s) not defined')
  }
  if (_.difference(paramIds, paramRefs[paramType]).length !== 0) {
    context.errors.push('Unused parameter definition')
  }
}

function valueDomainMatch (value, domain, context, domainVariableExact = false) {
  const valueDomainName = getValueDomainName(value, context, domainVariableExact)
  const domainName = getDomainName(domain, domainVariableExact)
  if (valueDomainName !== domainName) {
    context.errors.push('Value-domain mismatch')
  }
}

function getValueDomainName (value, context, domainVariableExact) {
  if (value.variable) {
    const valueDef = _.find(context.definition.valueParams, d => d.id === value.p)
    return getDomainName(valueDef.domain, domainVariableExact)
  }
  if (value.v.type === 'application') {
    const def = _.find(context.program.definitions, d => d.id === value.v.definition)
    return getDomainName(getAppliedDomain(def.domain, value.v.domainArgs))
  }
  if (value.v.type === 'ifelse') {
    return getDomainName(value.v.domain)
  }
  if (value.v.type === 'integer-literal') {
    return 'integer'
  }
  if (value.v.type === 'string-literal') {
    return 'string'
  }
  if (value.v.type === 'bool-literal') {
    return 'bool'
  }
}

function getDomainName (domain, domainVariableExact) {
  if (domain.variable) {
    return domainVariableExact ? `variable-${domain.p}` : 'variable'
  }
  return domain.v
}

module.exports = {
  validate,
  requiredProps,
  oneOf
}
