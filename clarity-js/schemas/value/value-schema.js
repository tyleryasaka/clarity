module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/value',
    'oneOf': [
      { '$ref': 'string-literal' },
      { '$ref': 'integer-literal' },
      { '$ref': 'call' },
      { '$ref': 'variable-ref' }
    ]
  }
}
