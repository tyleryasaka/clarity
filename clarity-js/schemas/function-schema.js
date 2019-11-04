module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/function',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'returnType', 'params', 'variables', 'returnValue'],
    'properties': {
      'element': { '$ref': 'element-enum' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'returnType': { '$ref': 'hidden-identifier' },
      'params': {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'type': { '$ref': 'hidden-identifier' },
            'name': { '$ref': 'hidden-identifier' }
          }
        }
      },
      'variables': {
        'type': 'array'
      },
      'returnValue': {
        'type': 'object'
      }
    }
  }
}
