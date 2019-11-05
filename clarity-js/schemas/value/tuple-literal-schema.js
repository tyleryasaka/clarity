module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/tuple-literal',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'members'],
    'properties': {
      'element': { 'const': 'tuple-literal' },
      'members': {
        'type': 'array',
        'items': { '$ref': 'value' }
      }
    }
  }
}
