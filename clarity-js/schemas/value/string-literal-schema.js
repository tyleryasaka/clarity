module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/string-literal',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'value'],
    'properties': {
      'element': { 'const': 'string-literal' },
      'value': { 'type': 'string' }
    }
  }
}
