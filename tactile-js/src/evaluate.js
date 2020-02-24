const _ = require('underscore')
const {
  processProgram,
  getNodeProperty
} = require('./process-tree')
const {
  evaluateCoreFunction
} = require('./core/core')

function evaluate (program, functionIndex, libraries = {}) {
  const { programObject } = processProgram(program)
  const libraryObjects = _.mapObject(libraries, (library) => {
    return processProgram(library).programObject
  })
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
  const context = { program: programObject, valueArgs: [], libraries: libraryObjects }
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
  if (new RegExp('^core\\..+\\..+$').test(resolvedIndex.node)) {
    // this is a call to core library function - evaluate externally
    return evaluateCoreFunction(resolvedIndex.node, newContext.valueArgs)
  } else if (new RegExp('^library\\..+\\.\\d+$').test(resolvedIndex.node)) {
    // this is a call to external library function - get definition from that library
    const exploded = resolvedIndex.node.split('.')
    const libraryName = exploded[1]
    const library = context.libraries[libraryName]
    const functionIndex = Number(exploded[2])
    const libraryFunctions = getNodeProperty(library, 'functions')
    const functionObject = libraryFunctions[functionIndex]
    return evaluateFunction(functionObject, newContext)
  } else {
    const functionObject = programFunctions[Number(resolvedIndex.node)]
    return evaluateFunction(functionObject, newContext)
  }
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
