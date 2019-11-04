module.exports = function () {
  return {
    '$schema': 'http://json-schema.org/schema#',
    '$id': 'clarity/element-enum',
    'type': 'string',
    'enum': ['package', 'module', 'function', 'tuple', 'struct']
  }
}
