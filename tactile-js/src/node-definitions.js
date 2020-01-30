const variableTypes = [
  'function',
  'domain',
  'value'
]

const primitiveValidators = {
  'string-literal': new RegExp('.*'),
  'bool-literal': new RegExp('^(true|false)$'),
  'integer-literal': new RegExp('^\\d+$'),
  'domain-literal': new RegExp('^(string|integer|bool|function)$')
}

const multiTypes = {
  value: ['application', 'ifelse', 'function', 'integer-literal', 'string-literal', 'bool-literal'],
  domain: ['domain-literal', 'function-signature']
}

const nodeValidators = {
  program: [
    {
      key: 'functions',
      type: 'function-definition',
      list: true
    }
  ],
  'function-definition': [
    {
      key: 'id',
      type: 'string-literal',
      list: false
    },
    {
      key: 'function',
      type: 'function',
      list: false
    }
  ],
  function: [
    {
      key: 'name',
      type: 'string-literal',
      list: false
    },
    {
      key: 'description',
      type: 'string-literal',
      list: false
    },
    {
      key: 'domainParams',
      type: 'domainParam',
      list: true
    },
    {
      key: 'valueParams',
      type: 'valueParam',
      list: true
    },
    {
      key: 'domain',
      type: 'domain',
      list: false
    },
    {
      key: 'body',
      type: 'value',
      list: false
    }
  ],
  domainParam: [
    {
      key: 'name',
      type: 'string-literal',
      list: false
    },
    {
      key: 'description',
      type: 'string-literal',
      list: false
    }
  ],
  valueParam: [
    {
      key: 'name',
      type: 'string-literal',
      list: false
    },
    {
      key: 'description',
      type: 'string-literal',
      list: false
    },
    {
      key: 'domain',
      type: 'domain',
      list: false
    }
  ],
  'function-signature': [
    {
      key: 'domain',
      type: 'domain',
      list: false
    },
    {
      key: 'domainParamsCount',
      type: 'integer-literal',
      list: false
    },
    {
      key: 'valueParamDomains',
      type: 'domain',
      list: true
    }
  ],
  application: [
    {
      key: 'function',
      type: 'string-literal',
      list: false
    },
    {
      key: 'valueArgs',
      type: 'value',
      list: true
    },
    {
      key: 'domainArgs',
      type: 'domain',
      list: true
    }
  ],
  ifelse: [
    {
      key: 'domain',
      type: 'domain',
      list: false
    },
    {
      key: 'condition',
      type: 'value',
      list: false
    },
    {
      key: 'if',
      type: 'value',
      list: false
    },
    {
      key: 'else',
      type: 'value',
      list: false
    }
  ]
}

module.exports = {
  variableTypes,
  primitiveValidators,
  multiTypes,
  nodeValidators
}
