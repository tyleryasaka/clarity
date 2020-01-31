// Essentially, this file handles type (aka "domain") checking

const _ = require('underscore')
const {
  validityResult,
  chainIfValid,
  validateEach
} = require('./utils')
const {
  processProgram,
  getNodeProperty
} = require('./process-tree')

// returns: validity result
function validateDomain (program) {
  const { programObject, nodeObject, path, getChildren } = processProgram(program)
  const context = { program: programObject, valueParams: [] }
  return validateNode(nodeObject, path, getChildren, context)
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
function validateNode (nodeObject, path, getChildren, context) {
  if (nodeObject.isPrimitive || nodeObject.isVariable || !nodeObject.isSemantic) {
    return proceed(getChildren, context)
  } else if (nodeObject.nodeType === 'application') {
    return validateApplicationNode(nodeObject, path, getChildren, context)
  } else if (nodeObject.nodeType === 'function') {
    return validateFunctionNode(nodeObject, path, getChildren, context)
  } else if (nodeObject.nodeType === 'ifelse') {
    return validateIfelseNode(nodeObject, path, getChildren, context)
  } else {
    return proceed(getChildren, context)
  }
}

// returns: validity result
function validateApplicationNode (nodeObject, path, getChildren, context) {
  // match application with function it tries to call
  const domainArgs = getNodeProperty(nodeObject, 'domainArgs')
  const valueArgs = getNodeProperty(nodeObject, 'valueArgs')
  const functionSignature = getReferencedFunctionSignature(nodeObject, context, domainArgs)
  const domainParamsCount = Number(functionSignature.signature.domainParamsCount)
  const valueParamDomains = functionSignature.signature.valueParamDomains
  return chainIfValid([
    // 1. application domainArgs count matches function domainParams count
    () => validityResult(domainArgs.length === domainParamsCount, 'domain-arg-mismatch.count', path),
    // 2. application valueArgs count matches function valueParams count
    () => validityResult(valueArgs.length === valueParamDomains.length, 'value-arg-mismatch.count', path),
    // 3. valueArg domains match valueParam domains
    () => validateEach(valueArgs, (arg, i) => {
      return valueMatchesDomain(arg, valueParamDomains[i], context, path)
    }),
    () => proceed(getChildren, context)
  ])
}

// returns: validity result
function validateFunctionNode (nodeObject, path, getChildren, context) {
  // Need to pass down function valueParams as context
  const newContext = _.clone(context)
  newContext.valueParams = getNodeProperty(nodeObject, 'valueParams')
  const body = getNodeProperty(nodeObject, 'body')
  const domainComparisonObj = getDomainComparisonObject(getNodeProperty(nodeObject, 'domain'))
  return chainIfValid([
    // Function body and specified domain should match
    () => valueMatchesDomain(body, domainComparisonObj, newContext, path),
    () => proceed(getChildren, newContext)
  ])
}

// returns: validity result
function validateIfelseNode (nodeObject, path, getChildren, context) {
  const ifObj = getNodeProperty(nodeObject, 'if')
  const elseObj = getNodeProperty(nodeObject, 'else')
  const domainComparisonObj = getDomainComparisonObject(getNodeProperty(nodeObject, 'domain'))
  return chainIfValid([
    // 1. "if" branch should match specified domain
    () => valueMatchesDomain(ifObj, domainComparisonObj, context, path),
    // 2. "else" branch should match specified domain
    () => valueMatchesDomain(elseObj, domainComparisonObj, context, path),
    // 2. "condition" should be boolean
    () => valueIsBoolean(getNodeProperty(nodeObject, 'condition'), context, path),
    () => proceed(getChildren, context)
  ])
}

// returns: validity result
function valueMatchesDomain (value, expectedDomainComparisonObj, context, path) {
  const actualDomain = getDomainOfValue(value, context)
  return domainsAreEqual(actualDomain, expectedDomainComparisonObj, path)
}

// returns: validity result
function valueIsBoolean (value, context, path) {
  const actualDomain = getDomainOfValue(value, context)
  const expectedDomain = { domainType: 'bool' }
  return domainsAreEqual(actualDomain, expectedDomain, path)
}

// returns: validity result
function domainsAreEqual (domainA, domainB, path) {
  return chainIfValid([
    // 1. Domain types should match, at a minimum
    () => validityResult(domainA.domainType === domainB.domainType, 'value-domain-mismatch', path),
    () => {
      if (domainA.domainType === 'variable') {
        // 2. Variable domains should "vary together" - that is, they should be populated by the same domain param
        // Otherwise, they could get set to different domains and cause runtime domain mismatch
        return validityResult(domainA.param === domainB.param, 'value-domain-mismatch.variable-param', path)
      } else if (domainA.domainType === 'function') {
        // 3. Perform additional validation for functions
        return chainIfValid([
          // a. Functions return values should have the same domain
          () => domainsAreEqual(domainA.signature.domain, domainB.signature.domain, path),
          // b. The number of domain params should match
          () => validityResult(domainA.signature.domainParamsCount === domainB.signature.domainParamsCount, 'function-signature-mismatch.domain-param-count', path),
          // c. The number of value params should match
          () => validityResult(domainA.signature.valueParamDomains.length === domainB.signature.valueParamDomains.length, 'function-signature-mismatch.value-param-count', path),
          // d. Each value param should have the same domain
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

// returns: node object
function getResolvedVariable (nodeObject, params) {
  return params[Number(nodeObject.variableRef)]
}

// returns: domain object for domain comparison
function getDomainOfValue (nodeObject, context) {
  if (nodeObject.isVariable) {
    const param = getResolvedVariable(nodeObject, context.valueParams)
    return getDomainComparisonObject(getNodeProperty(param, 'domain'))
  } else if (nodeObject.nodeType === 'application') {
    const domainArgs = getNodeProperty(nodeObject, 'domainArgs')
    const functionSignature = getReferencedFunctionSignature(nodeObject, context, domainArgs)
    return functionSignature.signature.domain
  } else if (nodeObject.nodeType === 'ifelse') {
    return getDomainComparisonObject(getNodeProperty(nodeObject, 'domain'))
  } else if (nodeObject.nodeType === 'function') {
    return getFunctionSignatureFromDefinition(nodeObject)
  } else if (nodeObject.nodeType === 'integer-literal') {
    return { domainType: 'integer' }
  } else if (nodeObject.nodeType === 'string-literal') {
    return { domainType: 'string' }
  } else if (nodeObject.nodeType === 'bool-literal') {
    return { domainType: 'bool' }
  }
}

// returns: domain object for domain comparison
function getDomainComparisonObject (domainNode, domainArgs = []) {
  const appliedNode = (domainArgs.length > 0 && domainNode.isVariable)
    // if domainArgs is non-empty, this is applied function
    // In this case, variable is from referenced functions rather than current context
    // and we need to substitute the passed in domainArgs to get domain in current context
    ? domainArgs[Number(domainNode.variableRef)]
    : domainNode
  if (appliedNode.isVariable) {
    return { domainType: 'variable', paramIndex: appliedNode.variableRef }
  } else if (appliedNode.nodeType === 'domain-literal') {
    return { domainType: appliedNode.node }
  } else if (appliedNode.nodeType === 'function-signature') {
    return getFunctionSignatureFromDomain(appliedNode)
  }
}

// returns: function signature (domain object) for domain comparison
function newComparisonSignature (domain, domainParamsCount, valueParamDomains, domainArgs = []) {
  return {
    domainType: 'function',
    signature: {
      domain: getDomainComparisonObject(domain, domainArgs),
      domainParamsCount: domainParamsCount,
      valueParamDomains: valueParamDomains.map(valueParamDomain => {
        return getDomainComparisonObject(valueParamDomain, domainArgs)
      })
    }
  }
}

// returns: function signature (domain object) for domain comparison
function getFunctionSignatureFromDefinition (functionDef, domainArgs) {
  // construct function signature from a function definition
  const functionDomain = getNodeProperty(functionDef, 'domain')
  const domainParamsCount = getNodeProperty(functionDef, 'domainParams').length
  const valueParams = getNodeProperty(functionDef, 'valueParams')
  const valueParamDomains = valueParams.map(valueParam => getNodeProperty(valueParam, 'domain'))
  return newComparisonSignature(functionDomain, domainParamsCount, valueParamDomains, domainArgs)
}

// returns: function signature (domain object) for domain comparison
function getFunctionSignatureFromDomain (domainObject) {
  // construct a formatted function signature (for domain comparison) from a syntactic domain object
  const signatureDomain = getNodeProperty(domainObject, 'domain')
  const signatureDomainParamsCount = getNodeProperty(domainObject, 'domainParamsCount').node
  const signatureValueParamDomains = getNodeProperty(domainObject, 'valueParamDomains')
  return newComparisonSignature(signatureDomain, signatureDomainParamsCount, signatureValueParamDomains)
}

// returns: function signature (domain object) for domain comparison
function getReferencedFunctionSignature (applicationNodeObject, context, domainArgs) {
  // returns: function signature for domain comparison
  // TODO function definitions should not be variable
  const functionRef = getNodeProperty(applicationNodeObject, 'function')
  if (functionRef.isVariable) {
    const param = getResolvedVariable(functionRef, context.valueParams)
    const paramDomain = getNodeProperty(param, 'domain')
    return getFunctionSignatureFromDomain(paramDomain)
  } else {
    const functionIndex = Number(functionRef.node)
    const programFunctions = getNodeProperty(context.program, 'functions')
    const functionDefinition = getNodeProperty(programFunctions[functionIndex], 'function')
    return getFunctionSignatureFromDefinition(functionDefinition, domainArgs)
  }
}

module.exports = {
  validateDomain
}
