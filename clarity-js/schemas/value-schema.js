module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/value',
    'type': 'object',
    'additionalProperties': false,
    'oneOf': [
      { '$ref': 'call' },
      { 'type': 'number' },
      { 'type': 'string' },
      { '$ref': 'variable-ref' }
    ]
  }
}
