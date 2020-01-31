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
  const { nodeObject, path, getChildren } = processProgram(program)
  return validateNode(nodeObject, path, getChildren)
}

function validateNode (nodeObject, path, getChildren) {
  const allowedTypes = multiTypes[nodeObject.semanticNodeType]
  const keysWithType = nodeValidators[nodeObject.nodeType]
  const proceed = () => {
    return chainIfValid(getChildren.map(getChild => {
      return () => {
        const { nodeObject, path, getChildren } = getChild()
        return validateNode(nodeObject, path, getChildren)
      }
    }))
  }
  if (nodeObject.isPrimitive) {
    // primitive node type
    const regex = primitiveValidators[nodeObject.nodeType]
    return validityResult(regex.test(nodeObject.node), 'invalid-primitive', path)
  } else if (nodeObject.nodeType === 'variable') {
    // variable node type
    return chainIfValid([
      () => hasKeys(nodeObject.node, ['variable', 'child'], path),
      proceed
    ])
  } else if (nodeObject.nodeType === 'multitype') {
    // multitype node type
    return chainIfValid([
      () => hasKeys(nodeObject.node, ['childType', 'child'], path),
      () => validityResult(_.contains(allowedTypes, nodeObject.node.childType), 'type-not-allowed', path),
      proceed
    ])
  } else {
    // object node type
    return chainIfValid([
      () => validateObj(keysWithType, nodeObject, path),
      proceed
    ])
  }
}

function validateObj (keysWithType, nodeObject, path) {
  return chainIfValid([
    () => hasKeys(nodeObject.node, _.map(keysWithType, kWT => kWT.key), path),
    () => {
      return validateEach(keysWithType, (keyWithType) => {
        return validateProperty(keyWithType.list, nodeObject, keyWithType.key, path)
      })
    }
  ])
}

function validateProperty (isList, nodeObject, key, path) {
  const property = nodeObject.node[key]
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
