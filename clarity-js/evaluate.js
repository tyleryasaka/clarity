const _ = require('underscore')
const { validate, requiredProps, oneOf } = require('./validate')

function evaluate (program, defId, valueArgs = [], alreadyValidated = false) {
  const programErrors = alreadyValidated ? validate(program) : []
  if (programErrors.length) {
    return { errors: programErrors }
  }
  const argErrors = validateArgs(valueArgs)
  if (argErrors.length) {
    return { errors: argErrors }
  }
  const def = _.find(program.definitions, d => d.id === defId)
  if (isDynamic(def, valueArgs)) {
    return { errors: [], dynamic: true }
  } else {
    const context = { program, valueArgs }
    return { dynamic: false, result: evaluateDefinition(def, context) }
  }
}

function validateArgs (valueArgs) {
  const context = { errors: [] }
  valueArgs.forEach(a => {
    requiredProps(a, ['param', 'value'], context)
    requiredProps(a.value, ['variable', 'v'], context)
    requiredProps(a.value.v, ['type', 'literalValue'], context)
    oneOf(a.value.v.type, ['integer-literal', 'string-literal', 'bool-literal'], context)
  })
  return context.errors
}

function isDynamic (def, valueArgs) {
  const paramIds = def.valueParams.map(p => p.id)
  const argIds = valueArgs.map(a => a.param)
  return ((def.domainParams.length > 0) || (def.valueParams.length > 0)) && (_.difference(paramIds, argIds).length > 0)
}

function evaluateDefinition (def, context) {
  return evaluateValue(def.body, context)
}

function evaluateValue (val, context) {
  const resolvedVal = val.variable
    ? _.find(context.valueArgs, a => a.param === val.p).value
    : val
  if (resolvedVal.v.type === 'application') {
    return evaluateApplication(resolvedVal.v, context)
  }
  if (resolvedVal.v.type === 'ifelse') {
    return evaluateIfelse(resolvedVal.v, context)
  }
  if (resolvedVal.v.type === 'integer-literal') {
    return resolvedVal
  }
  if (resolvedVal.v.type === 'string-literal') {
    return resolvedVal
  }
  if (resolvedVal.v.type === 'bool-literal') {
    return resolvedVal
  }
}

function evaluateApplication (app, context) {
  const defId = app.definition
  const valueArgs = app.valueArgs.map(a => {
    return {
      param: a.param,
      value: evaluateValue(a.value)
    }
  })
  const { result } = evaluate(context.program, defId, valueArgs, true)
  return result
}

function evaluateIfelse (ifelse, context) {
  const condition = evaluateValue(ifelse.condition, context)
  if (condition.v.literalValue) {
    return evaluateValue(ifelse.if, context)
  } else {
    return evaluateValue(ifelse.else, context)
  }
}

module.exports = evaluate
