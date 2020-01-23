const _ = require('underscore')

function validateSyntax (program) {
  if (!validateProgram(program)) {
    return false
  }
  const results = program.functions.map(f => validateFunction(f))
  return _.every(results, r => r)
}

function requiredProps (obj, props) {
  return _.every(props.map(p => _.property(p)(obj) !== undefined), r => r)
}

function oneOf (val, options) {
  return _.includes(options, val)
}

function validateProgram (program) {
  return requiredProps(program, ['functions'])
}

function validateFunction (fn) {
  const props = ['type', 'id', 'name', 'description', 'domainParams', 'valueParams', 'domain', 'body']
  if (!requiredProps(fn, props)) {
    return false
  }
  if (!validateDomainParams(fn.domainParams)) {
    return false
  }
  if (!validateValueParams(fn.valueParams)) {
    return false
  }
  if (!validateDomain(fn.domain)) {
    return false
  }
  if (!validateValue(fn.body)) {
    return false
  }
  return true
}

function validateValueParams (params) {
  const props = ['name', 'description', 'domain']
  return _.every(params.map(param => {
    return requiredProps(param, props) && validateDomain(param.domain)
  }), r => r)
}

function validateDomainParams (params) {
  const props = ['name', 'description']
  return _.every(params.map(param => requiredProps(param, props)))
}

function validateDomain (domain) {
  const ifNotVariable = (v) => {
    return requiredProps(v, ['domainType'])
  }
  return validateVariable(domain, ifNotVariable)
}

function validateValue (value) {
  const ifNotVariable = (v) => {
    if (!requiredProps(v, ['type'])) {
      return false
    }
    if (!oneOf(v.type, ['application', 'ifelse', 'integer-literal', 'string-literal', 'bool-literal', 'complex-literal', 'function-literal'])) {
      return false
    }
    if (v.type === 'application') {
      return validateApplication(v)
    }
    if (v.type === 'ifelse') {
      return validateIfelse(v)
    }
    return true
  }
  return validateVariable(value, ifNotVariable)
}

function validateApplication (app) {
  const props = ['function', 'valueArgs', 'domainArgs']
  if (!requiredProps(app, props)) {
    return false
  }
  const ifNotVariable = () => {
    return validateDomainArgs(app.domainArgs) && validateValueArgs(app.valueArgs)
  }
  return validateVariable(app.function, ifNotVariable)
}

function validateDomainArgs (domainArgs) {
  // TODO
  return true
}

function validateValueArgs (valueArgs) {
  // TODO
  return true
}

function validateIfelse (ifelse, paramRefs, context) {
  const props = ['domain', 'condition', 'if', 'else']
  if (!requiredProps(ifelse, props, context)) {
    return false
  }
  if (!validateDomain(ifelse.domain)) {
    return false
  }
  if (!validateValue(ifelse.condition)) {
    return false
  }
  if (!validateValue(ifelse.if)) {
    return false
  }
  if (!validateValue(ifelse.else)) {
    return false
  }
  return true
}

function validateVariable (item, nonVariableCb = () => true, variableCb = () => true) {
  if (!requiredProps(item, ['variable'])) {
    return false
  }
  if (item.variable) {
    return requiredProps(item, ['p']) && variableCb(item.p)
  } else {
    return requiredProps(item, ['v']) && nonVariableCb(item.v)
  }
}

module.exports = {
  validateSyntax
}
