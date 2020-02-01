const _ = require('underscore')
const {
  processProgram,
  getNodeProperty
} = require('./process-tree')

function evaluate (program, functionIndex) {
  const { programObject } = processProgram(program)
  const programFunctions = getNodeProperty(programObject, 'functions')
  if (functionIndex >= programFunctions.length) {
    return { errorCode: 'nonexistent-function' }
  }
  const functionObject = programFunctions[functionIndex]
  const domainParams = getNodeProperty(functionObject, 'domainParams')
  const valueParams = getNodeProperty(functionObject, 'valueParams')
  if ((domainParams.length > 0) || (valueParams.length > 0)) {
    return { errorCode: 'nonexecutable-function' }
  }
  const context = { program: programObject, valueArgs: [] }
  return { errorCode: '', result: evaluateFunction(functionObject, context).node }
}

function evaluateFunction (functionObject, context) {
  return evaluateValue(getNodeProperty(functionObject, 'body'), context)
}

function evaluateValue (value, context) {
  const resolvedVal = value.isVariable
    ? context.valueArgs[Number(value.variableRef)]
    : value
  if (resolvedVal.nodeType === 'application') {
    return evaluateApplication(resolvedVal, context)
  }
  if (resolvedVal.nodeType === 'ifelse') {
    return evaluateIfelse(resolvedVal, context)
  }
  if (resolvedVal.nodeType === 'opt-getter') {
    return evaluateOptGetter(resolvedVal, context)
  }
  if (resolvedVal.nodeType === 'integer-literal') {
    return resolvedVal
  }
  if (resolvedVal.nodeType === 'string-literal') {
    return resolvedVal
  }
  if (resolvedVal.nodeType === 'bool-literal') {
    return resolvedVal
  }
}

function evaluateApplication (app, context) {
  const functionIndex = getNodeProperty(app, 'function')
  const resolvedIndex = functionIndex.isVariable
    ? context.valueArgs[Number(functionIndex.variableRef)]
    : functionIndex
  const newContext = _.clone(context)
  newContext.valueArgs = getNodeProperty(app, 'valueArgs')
  const programFunctions = getNodeProperty(context.program, 'functions')
  const functionObject = programFunctions[Number(resolvedIndex.node)]
  return evaluateFunction(functionObject, newContext)
}

function evaluateIfelse (ifelse, context) {
  const condition = evaluateValue(getNodeProperty(ifelse, 'condition'), context)
  if (condition.node === 'true') {
    return evaluateValue(getNodeProperty(ifelse, 'if'), context)
  } else {
    return evaluateValue(getNodeProperty(ifelse, 'else'), context)
  }
}

function evaluateOptGetter (optGetter, context) {
  const value = evaluateValue(getNodeProperty(optGetter, 'value'), context)
  if (value.nodeType === 'nothing') {
    return evaluateValue(getNodeProperty(optGetter, 'fallback'), context)
  } else {
    return value
  }
}

module.exports = evaluate
