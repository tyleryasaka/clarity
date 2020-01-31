// Essentially, this file handles type (aka "domain") checking

const _ = require('underscore')
const {
  validityResult,
  chainIfValid,
  validateEach
} = require('./utils')
const {
  processNode,
  getTrueNode
} = require('./process-tree')

function validateDomain (program) {
  const { node, nodeType, nodeClass, path, getNexts } = processNode(program, 'program')
  const context = { program, valueParams: [] }
  return validateNode(node, nodeType, nodeClass, path, getNexts, context)
}

function proceed (getNexts, context) {
  return chainIfValid(getNexts.map(next => {
    return () => {
      const { node, nodeType, nodeClass, path, getNexts } = next()
      return validateNode(node, nodeType, nodeClass, path, getNexts, context)
    }
  }))
}

function validateNode (node, nodeType, nodeClass, path, getNexts, context) {
  console.log('---', nodeType, nodeClass, node)
  if (nodeClass === 'variable') {
    return proceed(getNexts, context)
  } else if (nodeClass === 'primitive') {
    // primitive node type
    return validityResult(true, '', path)
  } else if (nodeType === 'application') {
    // application node
    const functionDef = getFunctionDefinition(node, context)
    const domainParamsCount = functionDef.isVariable
      ? getTrueNode(functionDef.param.domain).node.child.child.domainParamsCount
      : functionDef.node.domainParams.length
    const valueParamDomains = functionDef.isVariable
      ? getTrueNode(functionDef.param.domain).node.child.child.valueParamDomains
      : functionDef.node.valueParams.map(param => param.domain)
    return chainIfValid([
      () => validityResult(node.domainArgs.length === Number(domainParamsCount), 'domain-arg-mismatch.count', path),
      () => validityResult(node.valueArgs.length === valueParamDomains.length, 'value-arg-mismatch.count', path),
      () => validateEach(node.valueArgs, (arg, i) => {
        return valueMatchesDomain(arg, valueParamDomains[i], context, path, node.domainArgs)
      }),
      () => proceed(getNexts, context)
    ])
  } else if (nodeType === 'function') {
    const newContext = _.clone(context)
    // Need to pass down function valueParams as context
    newContext.valueParams = node.valueParams
    return chainIfValid([
      () => valueMatchesDomain(node.body, node.domain, newContext, path),
      () => proceed(getNexts, newContext)
    ])
  } else if (nodeType === 'ifelse') {
    return chainIfValid([
      () => valueMatchesDomain(node.if, node.domain, context, path),
      () => valueMatchesDomain(node.else, node.domain, context, path),
      () => valueIsBoolean(node.condition, context, path),
      () => proceed(getNexts, context)
    ])
  } else {
    return proceed(getNexts, context)
  }
}

function valueMatchesDomain (value, expectedDomain, context, path, domainArgs = []) {
  const actualDomain = getDomainOfValue(value, context)
  const expectedDomainFormat = getExplicitDomain(expectedDomain, domainArgs)
  return domainsAreEqual(actualDomain, expectedDomainFormat, path)
}

function valueIsBoolean (value, context, path) {
  const actualDomain = getDomainOfValue(value, context)
  const expectedDomain = { domainType: 'bool' }
  return domainsAreEqual(actualDomain, expectedDomain, path)
}

function getResolvedNode (node, nodeType, params) {
  const trueNode = getTrueNode(node, nodeType)
  const isVariable = trueNode.isVariable
  return isVariable
    ? { isVariable, param: resolvedParam(trueNode.node, params) }
    : { isVariable, node: trueNode.node, nodeType: trueNode.nodeType }
}

function resolvedParam (node, params) {
  // TODO: need to verify (not here, but somewhere) that all referenced params exist
  const index = Number(node)
  return params[index]
}

function getDomainOfValue (value, context) {
  const trueNode = getResolvedNode(value, 'value', context.valueParams)
  if (trueNode.isVariable) {
    return getExplicitDomain(trueNode.param.domain)
  } else if (trueNode.nodeType === 'application') {
    const functionDef = getFunctionDefinition(trueNode.node, context)
    return functionDef.isVariable
      ? getExplicitDomain(getExplicitDomain(getTrueNode(functionDef.param.domain).node).domainType.domain)
      : getExplicitDomain(functionDef.node.domain, trueNode.node.domainArgs)
  } else if (trueNode.nodeType === 'ifelse') {
    return getExplicitDomain(trueNode.node.domain)
  } else if (trueNode.nodeType === 'function') {
    return getFunctionSignature(trueNode)
  } else if (trueNode.nodeType === 'integer-literal') {
    return { domainType: 'integer' }
  } else if (trueNode.nodeType === 'string-literal') {
    return { domainType: 'string' }
  } else if (trueNode.nodeType === 'bool-literal') {
    return { domainType: 'bool' }
  }
}

function getExplicitDomain (domainNode, domainArgs = []) {
  const trueNode = getTrueNode(domainNode, 'domain')
  const appliedNode = (domainArgs.length > 0 && trueNode.isVariable)
    // if domainArgs is non-empty, this is applied function
    // In this case, variable is from referenced functions rather than current context
    // and we need to substitute the passed in domainArgs to get domain in current context
    ? getTrueNode(domainArgs[Number(trueNode.node)], 'domain')
    : trueNode
  if (appliedNode.isVariable) {
    return { domainType: 'variable', param: appliedNode.node }
  } else if (appliedNode.nodeType === 'domain-literal') {
    return { domainType: appliedNode.node }
  } else if (appliedNode.nodeType === 'function-signature') {
    return { domainType: appliedNode.node }
  }
}

function domainsAreEqual (domainA, domainB, path) {
  console.log('*', domainA.domainType, domainB)
  return chainIfValid([
    () => validityResult(domainA.domainType === domainB.domainType, 'value-domain-mismatch', path),
    () => {
      if (domainA.domainType === 'variable') {
        return validityResult(domainA.param === domainB.param, 'value-domain-mismatch.variable-param', path)
      } else if (domainA.domainType === 'function') {
        return chainIfValid([
          () => domainsAreEqual(domainA.signature.domain, domainB.signature.domain, path),
          () => validityResult(domainA.signature.domainParamsCount === domainB.signature.domainParamsCount, 'function-signature-mismatch.domain-param-count', path),
          () => validityResult(domainA.signature.valueParamDomains.length === domainB.signature.valueParamDomains.length, 'function-signature-mismatch.value-param-count', path),
          () => validateEach(domainA.signature.valueParamDomains, (item, i) => {
            return domainsAreEqual(domainA.signature.valueParamDomains[i], domainB.signature.valueParamDomains[i], path)
          })
        ])
      } else {
        return validityResult(true, '', path)
      }
    }
  ])
}

function getFunctionSignature (trueNode) {
  return {
    domainType: 'function',
    signature: {
      domain: getExplicitDomain(trueNode.node.domain),
      domainParamsCount: trueNode.node.domainParamsCount,
      valueParamDomains: trueNode.node.valueParamDomains.map(item => {
        return getExplicitDomain(item)
      })
    }
  }
}

function getFunctionDefinition (application, context) {
  // TODO function definitions should not be variable
  const functionNode = getResolvedNode(application.function, 'function-reference', context.valueParams)
  return functionNode.isVariable
    ? functionNode
    : getResolvedNode(context.program.functions[Number(functionNode.node)].function, 'function', context.valueParams)
}

module.exports = {
  validateDomain
}
