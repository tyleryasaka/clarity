module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/struct',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'properties'],
    'properties': {
      'element': { 'const': 'struct' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'properties': {
        'type': 'array',
        'items': {
          'type': 'object',
          'additionalProperties': false,
          'required': ['type', 'name'],
          'properties': {
            'type': { '$ref': 'hidden-identifier' },
            'name': { '$ref': 'hidden-identifier' }
          }
        }
      }
    }
  }
}
