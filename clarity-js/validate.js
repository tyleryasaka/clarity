const _ = require('underscore')

function validate (program) {
  const errors = []
  const context = { errors, program }
  if (!validateProgram(program, context)) {
    return errors
  }
  if (!isUnique(program.definitions, 'id', context)) {
    return errors
  }
  program.definitions.forEach(d => {
    const definitionContext = { errors, program, definition: d }
    validateDefinition(d, definitionContext)
  })
  return errors
}

function isValid (errors) {
  return errors.length === 0
}

function requiredProps (obj, props, context) {
  props.forEach(p => {
    if (_.property(p)(obj) === undefined) {
      context.errors.push(`Missing property: ${p}`)
      return false
    }
  })
  return isValid(context.errors)
}

function oneOf (val, options, context) {
  if (!_.includes(options, val)) {
    context.errors.push(`${val} not allowed as a value`)
    return false
  }
  return isValid(context.errors)
}

function isUnique (items, key, context) {
  const ids = items.map(i => i[key])
  if (_.uniq(ids).length !== items.length) {
    context.errors.push(`Duplicate ids`)
    return false
  }
  return isValid(context.errors)
}

function validateProgram (program, context) {
  return requiredProps(program, ['definitions'], context)
}

function validateDefinition (d, context) {
  const props = ['type', 'id', 'name', 'description', 'domainParams', 'valueParams', 'domain', 'body']
  const paramRefs = {
    value: [],
    domain: []
  }
  if (!requiredProps(d, props, context)) {
    return false
  }
  if (!validateDomainParams(d.domainParams, context)) {
    return false
  }
  if (!validateValueParams(d.valueParams, paramRefs, context)) {
    return false
  }
  if (!validateDomain(d.domain, paramRefs, context)) {
    return false
  }
  if (!validateValue(d.body, paramRefs, context)) {
    return false
  }
  if (!validateParamRefs(d.valueParams, 'value', paramRefs, context)) {
    return false
  }
  if (!validateParamRefs(d.domainParams, 'domain', paramRefs, context)) {
    return false
  }
  return valueDomainMatch(d.body, d.domain, context, true)
}

function validateValueParams (params, paramRefs, context) {
  const props = ['name', 'description', 'domain']
  params.forEach(param => {
    if (!requiredProps(param, props, context)) {
      return
    }
    validateDomain(param.domain, paramRefs, context)
  })
  return isValid(context.errors)
}

function validateDomainParams (params, context) {
  const props = ['name', 'description']
  params.forEach(param => {
    requiredProps(param, props, context)
  })
  return isValid(context.errors)
}

function validateDomain (domain, paramRefs, context) {
  if (!validateVariable(domain, 'domain', paramRefs, context)) {
    return false
  }
  if (!domain.variable) {
    requiredProps(domain.v, ['domainType'], context)
  }
  return isValid(context.errors)
}

function validateValue (value, paramRefs, context) {
  if (!validateVariable(value, 'value', paramRefs, context)) {
    return false
  }
  if (!value.variable) {
    const v = value.v
    if (!requiredProps(v, ['type'], context)) {
      return false
    }
    if (!oneOf(v.type, ['application', 'ifelse', 'integer-literal', 'string-literal', 'bool-literal', 'complex-literal', 'definition-literal'], context)) {
      return false
    }
    if (v.type === 'application') {
      validateApplication(v, paramRefs, context)
    }
    if (v.type === 'ifelse') {
      validateIfelse(v, paramRefs, context)
    }
  }
  return isValid(context.errors)
}

function validateApplication (app, paramRefs, context) {
  const props = ['definition', 'valueArgs', 'domainArgs']
  if (!requiredProps(app, props, context)) {
    return false
  }
  if (!validateVariable(app.definition, 'value', paramRefs, context)) {
    return false
  }
  if (!app.definition.variable) {
    const def = _.find(context.program.definitions, d => d.id === app.definition.v)
    if (def === undefined) {
      context.errors.push('Referenced definition not defined')
      return false
    }
    validateDomainArgs(app.domainArgs, def, paramRefs, context)
    validateValueArgs(app.domainArgs, app.valueArgs, def, paramRefs, context)
  } else {
    // substitute variable
    // const variableDef = context.definition.valueParams[app.definition.p]
  }
  // TODO: validate args match type signature of variable definition
  return isValid(context.errors)
}

function validateDomainArgs (args, definition, paramRefs, context) {
  args.forEach((arg, a) => {
    const domainDef = definition.domainParams[a]
    if (domainDef === undefined) {
      context.errors.push('Referenced domain param not defined')
    }
    validateDomain(arg, paramRefs, context)
  })
  return isValid(context.errors)
}

function validateValueArgs (domainArgs, valueArgs, definition, paramRefs, context) {
  valueArgs.forEach((arg, a) => {
    const valueDef = definition.valueParams[a]
    if (valueDef === undefined) {
      context.errors.push('Referenced value param not defined')
    }
    validateValue(arg, paramRefs, context)
    // If this application specified a domain, make sure to use the applied domain
    const appliedDomain = getAppliedDomain(valueDef.domain, domainArgs)
    valueDomainMatch(arg, appliedDomain, context)
  })
  return isValid(context.errors)
}

function getAppliedDomain (definitionDomain, domainArgs) {
  const appliedDomain = definitionDomain.variable && domainArgs[definitionDomain.p]
  return appliedDomain || definitionDomain
}

function validateIfelse (ifelse, paramRefs, context) {
  const props = ['domain', 'condition', 'if', 'else']
  if (!requiredProps(ifelse, props, context)) {
    return false
  }
  validateDomain(ifelse.domain, paramRefs, context)
  validateValue(ifelse.condition, paramRefs, context)
  validateValue(ifelse.if, paramRefs, context)
  validateValue(ifelse.else, paramRefs, context)
  if (getActualDomain(ifelse.condition, context).domainType !== 'bool') {
    context.errors.push('If/else condition is not boolean')
  }
  valueDomainMatch(ifelse.if, ifelse.domain, context, true)
  valueDomainMatch(ifelse.else, ifelse.domain, context, true)
  return isValid(context.errors)
}

function validateVariable (item, paramType, paramRefs, context) {
  requiredProps(item, ['variable'], context)
  if (item.variable) {
    requiredProps(item, ['p'], context)
    paramRefs[paramType].push(item.p)
  } else {
    requiredProps(item, ['v'], context)
  }
  return isValid(context.errors)
}

function validateParamRefs (params, paramType, paramRefs, context) {
  const paramIds = params.map((param, p) => p)
  if (_.difference(paramRefs[paramType], paramIds).length !== 0) {
    context.errors.push('Referenced param(s) not defined')
  }
  if (_.difference(paramIds, paramRefs[paramType]).length !== 0) {
    context.errors.push('Unused parameter definition')
  }
  return isValid(context.errors)
}

function valueDomainMatch (value, domain, context, domainVariableExact = false) {
  const actualDomain = getActualDomain(value, context, domainVariableExact)
  const expectedDomain = getExpectedDomain(domain, domainVariableExact)
  return domainsAreEqual(actualDomain, expectedDomain, context)
}

function domainsAreEqual (domainA, domainB, context) {
  if (domainA.domainType !== domainB.domainType) {
    context.errors.push('Value-domain mismatch')
    return false
  }
  if (domainA.domainType === 'definition') {
    domainsAreEqual(domainA.signature.domain, domainB.signature.domain, context)
    if (domainA.signature.domainParamsCount !== domainB.signature.domainParamsCount) {
      context.errors.push('Value-domain mismatch: domain param count')
      return false
    }
    if (domainA.signature.valueParamDomains.length !== domainB.signature.valueParamDomains.length) {
      context.errors.push('Value-domain mismatch: value param count')
      return false
    }
    domainA.signature.valueParamDomains.forEach((item, i) => {
      domainsAreEqual(domainA.signature.valueParamDomains[i], domainB.signature.valueParamDomains[i], context)
    })
  }
  return isValid(context.errors)
}

function getActualDomain (value, context, domainVariableExact) {
  if (value.variable) {
    // substitute variable
    const valueDef = context.definition.valueParams[value.p]
    if (!valueDef) {
      context.errors.push('')
    }
    return getExpectedDomain(valueDef.domain, domainVariableExact)
  }
  if (value.v.type === 'definition') {
    const def = value.v
    return {
      domainType: 'definition',
      signature: {
        domain: getExpectedDomain(def.domain),
        domainParamsCount: def.domainParams.length,
        valueParamDomains: def.valueParams.map(p => getExpectedDomain(p.domain))
      }
    }
  }
  if (value.v.type === 'application') {
    const def = value.v.definition.variable
      ? context.definition.valueParams[value.v.definition.p] // substitute variable
      : _.find(context.program.definitions, d => d.id === value.v.definition.v)
    const appliedDomain = getAppliedDomain(def.domain, value.v.domainArgs)
    return getExpectedDomain(appliedDomain)
  }
  if (value.v.type === 'ifelse') {
    return getExpectedDomain(value.v.domain)
  }
  if (value.v.type === 'integer-literal') {
    return { domainType: 'integer' }
  }
  if (value.v.type === 'string-literal') {
    return { domainType: 'string' }
  }
  if (value.v.type === 'bool-literal') {
    return { domainType: 'bool' }
  }
}

function getExpectedDomain (domain, domainVariableExact) {
  if (domain.variable) {
    const domainType = domainVariableExact ? `variable-${domain.p}` : 'variable'
    return { domainType }
  }
  return domain.v
}

module.exports = {
  validate,
  requiredProps,
  oneOf
}
