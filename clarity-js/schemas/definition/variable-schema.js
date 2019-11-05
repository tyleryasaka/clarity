module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/variable',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'name', 'description', 'type', 'value'],
    'properties': {
      'element': { 'const': 'variable' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'type': { '$ref': 'hidden-identifier' },
      'value': { '$ref': 'value' }
    }
  }
}
