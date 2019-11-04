const Ajv = require('ajv')
const identifierSchema = require('./schemas/identifier-schema')()
const hiddenIdentifierSchema = require('./schemas/hidden-identifier-schema')()
const elementEnumSchema = require('./schemas/element-enum-schema')()
const functionSchema = require('./schemas/function-schema')()
const tupleSchema = require('./schemas/tuple-schema')()
const structSchema = require('./schemas/struct-schema')()
const moduleSchema = require('./schemas/module-schema')()
const packageSchema = require('./schemas/package-schema')()

const ajv = new Ajv()
const validate = ajv
  .addSchema(identifierSchema)
  .addSchema(hiddenIdentifierSchema)
  .addSchema(elementEnumSchema)
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
