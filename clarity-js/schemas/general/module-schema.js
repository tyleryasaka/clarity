module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/module',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'contents'],
    'properties': {
      'element': { 'const': 'module' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'contents': {
        'type': 'array',
        'items': {
          'oneOf': [
            { '$ref': 'module' },
            { '$ref': 'definition' }
          ]
        }
      }
    }
  }
}
