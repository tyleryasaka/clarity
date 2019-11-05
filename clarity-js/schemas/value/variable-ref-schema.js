module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/variable-ref',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'variable'],
    'properties': {
      'element': { 'const': 'variable-ref' },
      'variable': {
        '$ref': 'hidden-identifier'
      }
    }
  }
}
