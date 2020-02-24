module.exports = {
  'core.math.add': {
    fn: function (valueArgs) {
      const argValues = valueArgs.map(arg => Number(arg.node))
      return String(argValues[0] + argValues[1])
    },
    signature: {
      domainType: 'function',
      signature: {
        domain: { domainType: 'integer' },
        domainParamsCount: 0,
        valueParamDomains: [{ domainType: 'integer' }, { domainType: 'integer' }]
      }
    }
  }
}
