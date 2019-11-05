module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/struct-literal',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'properties'],
    'properties': {
      'element': { 'const': 'struct-literal' },
      'properties': {
        'type': 'array',
        'items': {
          'type': 'object',
          'additionalProperties': false,
          'required': ['name', 'value'],
          'properties': {
            'name': { '$ref': 'hidden-identifier' },
            'value': { '$ref': 'value' }
          }
        }
      }
    }
  }
}
