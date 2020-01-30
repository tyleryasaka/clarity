const _ = require('underscore')
const {
  variableTypes,
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')

function processNode (node, nodeType, variableApplied = false) {
  const keysWithType = nodeValidators[nodeType]
  const regex = primitiveValidators[nodeType]
  const allowedTypes = multiTypes[nodeType]
  if (regex !== undefined) {
    return processPrimitive(node, nodeType)
  } else if (!variableApplied && _.includes(variableTypes, nodeType)) {
    return processVariable(node, nodeType)
  } else if (allowedTypes !== undefined) {
    return processMultitype(node, nodeType, allowedTypes)
  } else {
    return processObj(node, nodeType, keysWithType)
  }
}

function processPrimitive (node, nodeType) {
  return {
    node: node,
    nodeClass: 'primitive',
    nodeType: nodeType
  }
}

function processVariable (node, nodeType) {
  return {
    node: node,
    nodeClass: 'variable',
    nodeType: nodeType,
    getNexts: [() => {
      if (node.variable === 'true') {
        return processNode(node.child, 'integer-literal')
      } else {
        return processNode(node.child, nodeType, true)
      }
    }]
  }
}

function processMultitype (node, nodeType, allowedTypes, handler, reducer) {
  return {
    node: node,
    nodeClass: 'multitype',
    nodeType: nodeType,
    getNexts: processProperty(false, node['childType'], node, 'child')
  }
}

function processProperty (isList, propertyType, node, key) {
  const property = node[key]
  return isList
    ? property.map(item => {
      return () => {
        return processNode(item, propertyType)
      }
    })
    : [() => processNode(property, propertyType)]
}

function processObj (node, nodeType, keysWithType) {
  return {
    node: node,
    nodeClass: 'object',
    nodeType: nodeType,
    getNexts: _.flatten(keysWithType.map(keyWithType => {
      return processProperty(keyWithType.list, keyWithType.type, node, keyWithType.key)
    }))
  }
}

module.exports = {
  processNode
}
