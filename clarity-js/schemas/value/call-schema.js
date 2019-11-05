module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/call',
    'type': 'object',
    'additionalProperties': false,
    'required': ['element', 'function', 'args'],
    'properties': {
      'element': { 'const': 'call' },
      'function': { '$ref': 'hidden-identifier' },
      'args': {
        'type': 'object',
        'propertyNames': {
          'pattern': '^[A-Za-z0-9_-]+$'
        },
        'additionalProperties': { '$ref': 'value' }
      }
    }
  }
}
