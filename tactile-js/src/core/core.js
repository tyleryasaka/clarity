const _ = require('underscore')
const mathFns = require('./math')

function evaluateCoreFunction (functionId, valueArgs) {
  if (new RegExp('^core.math.').test(functionId)) {
    return evaluateMath(functionId, valueArgs)
  }
}

function evaluateMath (functionId, valueArgs) {
  const fn = mathFns[functionId].fn
  return { node: fn(valueArgs) }
}

function getCoreFunctionSignature (functionId) {
  return mathFns[functionId].signature
}

const fnIds = _.keys(mathFns)

module.exports = {
  evaluateCoreFunction,
  getCoreFunctionSignature,
  coreFunctions: fnIds
}
