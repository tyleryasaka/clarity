module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/integer-literal',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'value'],
    'properties': {
      'element': { 'const': 'integer-literal' },
      'value': {
        'pattern': '^[0-9]+$',
        'type': 'string'
      }
    }
  }
}
