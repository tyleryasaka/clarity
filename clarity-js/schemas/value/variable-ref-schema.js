module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/variable-ref',
    'type': 'object',
    'additionalProperties': false,
    'required': ['variable'],
    'properties': {
      'variable': {
        '$ref': 'hidden-identifier'
      }
    }
  }
}
