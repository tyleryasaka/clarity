module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/package',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'dictionary', 'contents'],
    'properties': {
      'element': { 'const': 'package' },
      'name': { '$ref': 'identifier' },
      'description': { 'type': 'string' },
      'dictionary': {
        'type': 'object',
        'propertyNames': {
          'pattern': '^[A-Za-z0-9]+$'
        },
        'additionalProperties': { '$ref': 'identifier' }
      },
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
