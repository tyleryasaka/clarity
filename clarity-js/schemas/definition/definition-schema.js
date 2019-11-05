module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/definition',
    'oneOf': [
      { '$ref': 'function' },
      { '$ref': 'tuple' },
      { '$ref': 'struct' },
      { '$ref': 'variable' }
    ]
  }
}
