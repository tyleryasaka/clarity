// Make sure all references to functions and parameters are valid

const _ = require('underscore')
const {
  validityResult,
  chainIfValid
} = require('./utils')
const {
  processProgram,
  getNodeProperty
} = require('./process-tree')

// returns: validity result
function validateReferences (program) {
  const { programObject, nodeObject, path, getChildren } = processProgram(program)
  const context = { program: programObject, valueParams: [] }
  return validateNode(nodeObject, path, getChildren, context)
}

// returns: validity result
function validateNode (nodeObject, path, getChildren, context) {
  if (nodeObject.nodeType === 'function-reference') {
    return validateFunctionReference(nodeObject, path, context)
  } else if (nodeObject.nodeType === 'variable-reference') {
    return validateVariableReference(nodeObject, path, context)
  } else if (nodeObject.nodeType === 'function') {
    const newContext = _.clone(context)
    newContext.valueParams = getNodeProperty(nodeObject, 'valueParams')
    return proceed(getChildren, newContext)
  } else {
    return proceed(getChildren, context)
  }
}

// returns: validity result
function proceed (getChildren, context) {
  return chainIfValid(getChildren.map(getChild => {
    return () => {
      const child = getChild()
      return validateNode(child.nodeObject, child.path, child.getChildren, context)
    }
  }))
}

// returns: validity result
function validateFunctionReference (functionRef, path, context) {
  const functionIndex = Number(functionRef.node)
  const programFunctions = getNodeProperty(context.program, 'functions')
  return validityResult((functionIndex >= 0) && (functionIndex < programFunctions.length), 'nonexistent-function')
}

// returns: validity result
function validateVariableReference (nodeObject, path, context) {
  const paramIndex = Number(nodeObject.node)
  const functionParams = context.valueParams
  return validityResult((paramIndex >= 0) && (paramIndex < functionParams.length), 'nonexistent-parameter')
}

module.exports = validateReferences
