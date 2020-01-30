const _ = require('underscore')
const {
  variableTypes,
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')

function processNode (node, nodeType, path = [], variableApplied = false) {
  const keysWithType = nodeValidators[nodeType]
  const regex = primitiveValidators[nodeType]
  const allowedTypes = multiTypes[nodeType]
  if (regex !== undefined) {
    return processPrimitive(node, nodeType, path)
  } else if (!variableApplied && _.includes(variableTypes, nodeType)) {
    return processVariable(node, nodeType, path)
  } else if (allowedTypes !== undefined) {
    return processMultitype(node, nodeType, path, allowedTypes)
  } else {
    return processObj(node, nodeType, path, keysWithType)
  }
}

function processPrimitive (node, nodeType, path) {
  return {
    node,
    nodeClass: 'primitive',
    path,
    nodeType
  }
}

function processVariable (node, nodeType, path) {
  return {
    node,
    nodeClass: 'variable',
    nodeType,
    path,
    getNexts: [() => {
      if (node.variable === 'true') {
        return processNode(node.child, 'integer-literal', path)
      } else {
        return processNode(node.child, nodeType, path, true)
      }
    }]
  }
}

function processMultitype (node, nodeType, path, allowedTypes) {
  return {
    node,
    nodeClass: 'multitype',
    nodeType,
    path,
    getNexts: processProperty(false, node['childType'], node, 'child', path)
  }
}

function processProperty (isList, propertyType, node, key, path) {
  const property = node[key]
  return isList
    ? property.map((item, i) => {
      return () => {
        return processNode(item, propertyType, _.union(path, [key, String(i)]))
      }
    })
    : [() => processNode(property, propertyType, _.union(path, [key]))]
}

function processObj (node, nodeType, path, keysWithType) {
  return {
    node,
    nodeClass: 'object',
    nodeType,
    path,
    getNexts: _.flatten(keysWithType.map(keyWithType => {
      return processProperty(keyWithType.list, keyWithType.type, node, keyWithType.key, path)
    }))
  }
}

module.exports = {
  processNode
}
