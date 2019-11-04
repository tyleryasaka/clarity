module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/variable',
    'type': 'object',
    'additionalProperties': false,
    'required': ['type', 'name', 'description', 'value'],
    'properties': {
      'type': { '$ref': 'hidden-identifier' },
      'name': { '$ref': 'hidden-identifier' },
      'description': { 'type': 'string' },
      'value': { '$ref': 'value' }
    }
  }
}
