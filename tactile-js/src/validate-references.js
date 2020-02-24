// Make sure all references to functions and parameters are valid

const _ = require('underscore')
const {
  validityResult,
  chainIfValid
} = require('./validation-utils')
const {
  processProgram,
  getNodeProperty
} = require('./process-tree')
const {
  coreFunctions
} = require('./core/core')

// returns: validity result
function validateReferences (program, libraries = {}) {
  const { programObject, nodeObject, path, getChildren } = processProgram(program)
  const libraryObjects = _.mapObject(libraries, (library) => {
    return processProgram(library).programObject
  })
  const context = { program: programObject, valueParams: [], libraries: libraryObjects }
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
  if (new RegExp('^core\\..+\\..+$').test(functionRef.node)) {
    // this is a call to core library function - evaluate externally
    return validityResult(_.includes(coreFunctions, functionRef.node), 'nonexistent-function')
  } else if (new RegExp('^library\\..+\\.\\d+$').test(functionRef.node)) {
    // this is a call to external library function - get definition from that library
    const exploded = functionRef.node.split('.')
    const libraryName = exploded[1]
    const functionIndex = Number(exploded[2])
    return chainIfValid([
      () => validityResult(context.libraries[libraryName] !== undefined, 'nonexistent-function'),
      () => {
        const library = context.libraries[libraryName]
        const libraryFunctions = getNodeProperty(library, 'functions')
        return validityResult((functionIndex >= 0) && (functionIndex < libraryFunctions.length), 'nonexistent-function')
      }
    ])
  } else {
    const functionIndex = Number(functionRef.node)
    const programFunctions = getNodeProperty(context.program, 'functions')
    return validityResult((functionIndex >= 0) && (functionIndex < programFunctions.length), 'nonexistent-function')
  }
}

// returns: validity result
function validateVariableReference (nodeObject, path, context) {
  const paramIndex = Number(nodeObject.node)
  const functionParams = context.valueParams
  return validityResult((paramIndex >= 0) && (paramIndex < functionParams.length), 'nonexistent-parameter')
}

module.exports = validateReferences
