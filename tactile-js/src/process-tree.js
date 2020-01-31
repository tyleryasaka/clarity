const _ = require('underscore')
const {
  variableTypes,
  primitiveValidators,
  multiTypes,
  nodeValidators
} = require('./node-definitions')

function processProgram (program) {
  const { nodeObject, path, getChildren } = processNode(program, 'program')
  const programObject = newNodeObject(program, 'program', 'program')
  return { programObject, nodeObject, path, getChildren }
}

function processNode (node, nodeType, path = [], variableApplied = false) {
  const keysWithType = nodeValidators[nodeType]
  const regex = primitiveValidators[nodeType]
  const allowedTypes = multiTypes[nodeType]
  if (!variableApplied && _.includes(variableTypes, nodeType)) {
    return processVariable(node, nodeType, path)
  } else if (allowedTypes !== undefined) {
    return processMultitype(node, nodeType, path, allowedTypes)
  } else if (regex !== undefined) {
    return processPrimitive(node, nodeType, path)
  } else {
    return processObj(node, nodeType, path, keysWithType)
  }
}

function newNodeObject (node, nodeType, semanticNodeType, variableRef) {
  const isSemantic = nodeType === semanticNodeType
  const isVariable = variableRef !== undefined
  const isPrimitive = _.includes(_.keys(primitiveValidators), nodeType)
  return {
    node,
    nodeType,
    semanticNodeType,
    variableRef,
    isSemantic,
    isVariable,
    isPrimitive
  }
}

function processPrimitive (node, nodeType, path) {
  return {
    nodeObject: newNodeObject(node, nodeType, nodeType),
    path,
    getChildren: []
  }
}

function processVariable (node, semanticNodeType, path) {
  const getChildren = [() => {
    if (node.variable === 'true') {
      return processNode(node.child, 'variable-reference', path, true)
    } else {
      return processNode(node.child, semanticNodeType, path, true)
    }
  }]
  return {
    nodeObject: newNodeObject(node, 'variable', semanticNodeType),
    path,
    getChildren
  }
}

function processMultitype (node, nodeType, path, allowedTypes) {
  const getChildren = processProperty(false, node['childType'], node, 'child', path)
  return {
    nodeObject: newNodeObject(node, 'multitype', nodeType),
    path,
    getChildren
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
  const getChildren = _.flatten(keysWithType.map(keyWithType => {
    return processProperty(keyWithType.list, keyWithType.type, node, keyWithType.key, path)
  }))
  return {
    nodeObject: newNodeObject(node, nodeType, nodeType),
    path,
    getChildren
  }
}

// returns: nodeObject
function getNodeProperty (nodeObject, key) {
  const property = nodeObject.node[key]
  const keyReference = _.find(nodeValidators[nodeObject.nodeType], v => v.key === key)
  const semanticNodeType = keyReference.type
  const isList = keyReference.list
  return isList
    ? property.map(item => getNodePropertyHelp(item, semanticNodeType))
    : getNodePropertyHelp(property, semanticNodeType)
}

function getNodePropertyHelp (node, semanticNodeType, variableApplied = false, isVariable = false) {
  const multitypes = multiTypes[semanticNodeType]
  const isVariableType = _.includes(variableTypes, semanticNodeType)
  if (isVariableType && !variableApplied) {
    // need to determine whether this is variable node
    return getNodePropertyHelp(node.child, semanticNodeType, true, node.variable === 'true')
  } else if (getNodePropertyHelp && variableApplied && isVariable) {
    // this is a variable node
    return newNodeObject(node, 'variable-reference', semanticNodeType, node)
  } else if (multitypes !== undefined) {
    // not variable; multitype, get the child node with specific type
    return newNodeObject(node.child, node.childType, node.childType)
  } else {
    // plain old non-variable non-multitype node
    return newNodeObject(node, semanticNodeType, semanticNodeType)
  }
}

module.exports = {
  processProgram,
  getNodeProperty
}
