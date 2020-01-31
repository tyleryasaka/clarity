const _ = require('underscore')
const {
  validityResult,
  chainIfValid,
  validateEach
} = require('./utils')
const {
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')
const {
  processProgram
} = require('./process-tree')

function validateSyntax (program) {
  const { node, nodeType, nodeClass, path, getNexts } = processProgram(program)
  return validateNode(node, nodeType, nodeClass, path, getNexts)
}

function validateNode (node, nodeType, nodeClass, path, getNexts) {
  const allowedTypes = multiTypes[nodeType]
  const keysWithType = nodeValidators[nodeType]
  const proceed = () => {
    return chainIfValid(getNexts.map(next => {
      return () => {
        const { node, nodeType, nodeClass, path, getNexts } = next()
        return validateNode(node, nodeType, nodeClass, path, getNexts)
      }
    }))
  }
  if (nodeClass === 'primitive') {
    // primitive node type
    const regex = primitiveValidators[nodeType]
    return validityResult(regex.test(node), 'invalid-primitive', path)
  } else if (nodeClass === 'variable') {
    // variable node type
    return chainIfValid([
      () => hasKeys(node, ['variable', 'child'], path),
      proceed
    ])
  } else if (allowedTypes !== undefined) {
    // multitype node type
    return chainIfValid([
      () => hasKeys(node, ['childType', 'child'], path),
      () => validityResult(_.contains(allowedTypes, node['childType']), 'type-not-allowed', path),
      proceed
    ])
  } else {
    // object node type
    return chainIfValid([
      () => validateObj(keysWithType, node, path),
      proceed
    ])
  }
}

function validateObj (keysWithType, node, path) {
  return chainIfValid([
    () => hasKeys(node, _.map(keysWithType, kWT => kWT.key), path),
    () => {
      return validateEach(keysWithType, (keyWithType) => {
        return validateProperty(keyWithType.list, node, keyWithType.key, path)
      })
    }
  ])
}

function validateProperty (isList, node, key, path) {
  const property = node[key]
  return isList
    ? validityResult(Array.isArray(property), 'invalid-list', path)
    : validityResult(true, '', path)
}

function hasAllExpectedKeys (expectedKeys, actualKeys, path) {
  return validityResult(_.difference(expectedKeys, actualKeys).length === 0, 'missing-key', path)
}

function hasNoExtraKeys (expectedKeys, actualKeys, path) {
  return validityResult(_.difference(actualKeys, expectedKeys).length === 0, 'extra-key', path)
}

function hasKeys (node, expectedKeys, path) {
  const actualKeys = _.keys(node)
  return chainIfValid([
    () => hasAllExpectedKeys(expectedKeys, actualKeys, path),
    () => hasNoExtraKeys(expectedKeys, actualKeys, path)
  ])
}

module.exports = validateSyntax
