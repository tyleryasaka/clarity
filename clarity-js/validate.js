const _ = require('underscore')

module.exports = function validate (program) {
  const errors = []
  try {
    const context = { errors, program }
    validateProgram(program, context)
    validateUnique(program.definitions, 'id', context)
    program.definitions.forEach(d => {
      validateDefinition(d, context)
    })
  } catch (e) {
    console.log(e)
  }
  return errors
}

function validateRequiredProps (obj, props, context) {
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
  const requiredProps = ['definitions']
  validateRequiredProps(program, requiredProps, context)
}

function validateDefinition (d, context) {
  const requiredProps = ['type', 'id', 'name', 'description', 'domainParams', 'valueParams', 'domain', 'body']
  const paramRefs = {
    value: [],
    domain: []
  }
  validateRequiredProps(d, requiredProps, context)
  validateDomainParams(d.domainParams, context)
  validateValueParams(d.valueParams, paramRefs, context)
  validateDomain(d.domain, paramRefs, context)
  // TODO: validate body matches domain
  validateValue(d.body, paramRefs, context)
  validateParamRefs(d.valueParams, 'value', paramRefs, context)
  validateParamRefs(d.domainParams, 'domain', paramRefs, context)
}

function validateValueParams (params, paramRefs, context) {
  const requiredProps = ['id', 'name', 'description', 'domain']
  params.forEach(param => {
    validateRequiredProps(param, requiredProps, context)
    validateDomain(param.domain, paramRefs, context)
  })
  validateUnique(params, 'id', context)
}

function validateDomainParams (params, context) {
  const requiredProps = ['id', 'name', 'description']
  params.forEach(param => {
    validateRequiredProps(param, requiredProps, context)
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
    validateRequiredProps(v, ['type'], context)
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
  const requiredProps = ['definition', 'valueArgs', 'domainArgs']
  validateRequiredProps(app, requiredProps, context)
  const def = _.find(context.program.definitions, d => d.id === app.definition)
  if (def === undefined) {
    context.errors.push('Referenced definition not defined')
  }
  validateDomainArgs(app.domainArgs, def, paramRefs, context)
  validateValueArgs(app.valueArgs, def, paramRefs, context)
}

function validateDomainArgs (args, definition, paramRefs, context) {
  const requiredProps = ['p', 'domain']
  args.forEach(arg => {
    validateRequiredProps(arg, requiredProps, context)
    // TODO: validate p and value in same domain
    const paramIds = definition.domainParams.map(d => d.id)
    if (!_.includes(paramIds, arg.p)) {
      context.errors.push('Referenced param not defined')
    }
    validateDomain(arg.domain, paramRefs, context)
  })
}

function validateValueArgs (args, definition, paramRefs, context) {
  const requiredProps = ['p', 'value']
  args.forEach(arg => {
    validateRequiredProps(arg, requiredProps, context)
    // TODO: validate p and value in same domain
    const paramIds = definition.valueParams.map(d => d.id)
    if (!_.includes(paramIds, arg.p)) {
      context.errors.push('Referenced param not defined')
    }
    validateValue(arg.value, paramRefs, context)
  })
}

function validateIfelse (ifelse, paramRefs, context) {
  const requiredProps = ['condition', 'if', 'else']
  validateRequiredProps(ifelse, requiredProps, context)
  // TODO: validate condition boolean domain
  validateValue(ifelse.condition, paramRefs, context)
  // TODO: validate if and else same domain
  validateValue(ifelse.if, paramRefs, context)
  validateValue(ifelse.else, paramRefs, context)
}

function validateVariable (item, paramType, paramRefs, context) {
  const requiredProps = ['variable']
  validateRequiredProps(item, requiredProps, context)
  if (item.variable) {
    validateRequiredProps(item, ['p'], context)
    paramRefs[paramType].push(item.p)
  } else {
    validateRequiredProps(item, ['v'], context)
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
