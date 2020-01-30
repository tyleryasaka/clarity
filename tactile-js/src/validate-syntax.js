const _ = require('underscore')
const {
  validityResult,
  withPath,
  chainIfValid,
  validateEach
} = require('./utils')
const {
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')
const {
  processNode
} = require('./process-tree')

function validateSyntax (program) {
  const { nodeClass, getNexts } = processNode(program, 'program')
  return withPath(validateNode(program, 'program', nodeClass, getNexts), ['program'])
}

function validateNode (node, nodeType, nodeClass, getNexts) {
  const allowedTypes = multiTypes[nodeType]
  const keysWithType = nodeValidators[nodeType]
  const proceed = () => {
    return chainIfValid(getNexts.map(next => {
      return () => {
        const { node, nodeType, nodeClass, getNexts } = next()
        return validateNode(node, nodeType, nodeClass, getNexts)
      }
    }))
  }
  if (nodeClass === 'primitive') {
    // primitive node type
    const regex = primitiveValidators[nodeType]
    return validityResult(regex.test(node), 'invalid-primitive')
  } else if (nodeClass === 'variable') {
    // variable node type
    return chainIfValid([
      () => hasKeys(node, ['variable', 'child']),
      proceed
    ])
  } else if (allowedTypes !== undefined) {
    // multitype node type
    return chainIfValid([
      () => hasKeys(node, ['childType', 'child']),
      () => validityResult(_.contains(allowedTypes, node['childType']), 'type-not-allowed'),
      proceed
    ])
  } else {
    // object node type
    return chainIfValid([
      () => validateObj(keysWithType, node),
      proceed
    ])
  }
}

function validateObj (keysWithType, node) {
  return chainIfValid([
    () => hasKeys(node, _.map(keysWithType, kWT => kWT.key)),
    () => {
      return validateEach(keysWithType, (keyWithType) => {
        return validateProperty(keyWithType.list, node, keyWithType.key)
      })
    }
  ])
}

function validateProperty (isList, node, key) {
  const property = node[key]
  return isList
    ? validityResult(Array.isArray(property), 'invalid-list')
    : validityResult(true, '')
}

function hasAllExpectedKeys (expectedKeys, actualKeys) {
  return validityResult(_.difference(expectedKeys, actualKeys).length === 0, 'missing-key')
}

function hasNoExtraKeys (expectedKeys, actualKeys) {
  return validityResult(_.difference(actualKeys, expectedKeys).length === 0, 'extra-key')
}

function hasKeys (node, expectedKeys) {
  const actualKeys = _.keys(node)
  return chainIfValid([
    () => hasAllExpectedKeys(expectedKeys, actualKeys),
    () => hasNoExtraKeys(expectedKeys, actualKeys)
  ])
}

module.exports = validateSyntax
