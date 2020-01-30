const _ = require('underscore')
const {
  validityResult,
  withPath,
  chainIfValid,
  validateEach
} = require('./utils')
const {
  variableTypes,
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')

function validateSyntax (program) {
  return withPath(validateNode(program, 'program'), ['program'])
}

function validateNode (node, nodeType, variableApplied = false) {
  const keysWithType = nodeValidators[nodeType]
  const regex = primitiveValidators[nodeType]
  const allowedTypes = multiTypes[nodeType]
  if (regex !== undefined) {
    return validatePrimitive(regex, node)
  } else if (!variableApplied && _.includes(variableTypes, nodeType)) {
    return validateVariable(node, nodeType)
  } else if (allowedTypes !== undefined) {
    return validateMultitype(allowedTypes, node)
  } else {
    return validateObj(keysWithType, node)
  }
}

function validatePrimitive (regex, value) {
  return validityResult(regex.test(value), 'invalid-primitive')
}

function validateVariable (node, nodeType) {
  return chainIfValid([
    () => hasKeys(node, ['variable', 'child']),
    () => {
      if (node.variable === 'true') {
        return validateNode(node.child, 'integer-literal')
      } else {
        return validateNode(node.child, nodeType, true)
      }
    }
  ])
}

function validateObj (keysWithType, node) {
  return chainIfValid([
    () => hasKeys(node, _.map(keysWithType, kWT => kWT.key)),
    () => {
      return validateEach(keysWithType, (keyWithType) => {
        return validateProperty(keyWithType.list, keyWithType.type, node, keyWithType.key)
      })
    }
  ])
}

function validateMultitype (allowedTypes, node) {
  return chainIfValid([
    () => hasKeys(node, ['childType', 'child']),
    () => validityResult(_.contains(allowedTypes, node['childType']), 'type-not-allowed'),
    () => validateProperty(false, node['childType'], node, 'child')
  ])
}

function validateProperty (isList, propertyType, node, key) {
  const property = node[key]
  return (
    isList
      ? chainIfValid([
        () => validityResult(Array.isArray(property), 'invalid-list'),
        () => {
          return property.length > 0
            ? validateEach(property, (item, i) => {
              return withPath(validateNode(item, propertyType), [key, String(i)])
            })
            : { isValid: true, errorCode: '', errorPath: [] }
        }
      ])
      : withPath(validateNode(property, propertyType), [key])
  )
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
