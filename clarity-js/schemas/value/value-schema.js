module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/value',
    'oneOf': [
      { 'type': 'string' },
      { '$ref': 'call' },
      { '$ref': 'variable-ref' }
    ]
  }
}
