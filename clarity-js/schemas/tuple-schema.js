module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/tuple',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'members'],
    'properties': {
      'element': { '$ref': 'element-enum' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'members': {
        'type': 'array',
        'items': { '$ref': 'identifier' }
      }
    }
  }
}
