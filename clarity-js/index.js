const Ajv = require('ajv')
const identifierSchema = require('./schemas/general/identifier-schema')()
const hiddenIdentifierSchema = require('./schemas/general/hidden-identifier-schema')()
const variableSchema = require('./schemas/general/variable-schema')()
const functionSchema = require('./schemas/element/function-schema')()
const tupleSchema = require('./schemas/element/tuple-schema')()
const structSchema = require('./schemas/element/struct-schema')()
const moduleSchema = require('./schemas/element/module-schema')()
const packageSchema = require('./schemas/element/package-schema')()
const elementEnumSchema = require('./schemas/element/element-enum-schema')()
const valueSchema = require('./schemas/value/value-schema')()
const callSchema = require('./schemas/value/call-schema')()
const variableRefSchema = require('./schemas/value/variable-ref-schema')()

const ajv = new Ajv()
const validate = ajv
  .addSchema(identifierSchema)
  .addSchema(hiddenIdentifierSchema)
  .addSchema(elementEnumSchema)
  .addSchema(valueSchema)
  .addSchema(callSchema)
  .addSchema(variableSchema)
  .addSchema(variableRefSchema)
  .addSchema(functionSchema)
  .addSchema(tupleSchema)
  .addSchema(structSchema)
  .addSchema(moduleSchema)
  .compile(packageSchema)

function load (str) {
  const data = JSON.parse(str)
  const isValid = validate(data)
  if (!isValid) console.log(validate.errors)
  return isValid
}

module.exports = {
  load
}
