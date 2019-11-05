module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/function',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'returnType', 'params', 'definitions', 'returnValue'],
    'properties': {
      'element': { 'const': 'function' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'returnType': { '$ref': 'hidden-identifier' },
      'params': {
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
      },
      'definitions': {
        'type': 'array',
        'items': {
          '$ref': 'definition'
        }
      },
      'returnValue': {
        '$ref': 'value'
      }
    }
  }
}
