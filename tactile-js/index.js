const Ajv = require('ajv')
const identifierSchema = require('./schemas/general/identifier-schema')()
const hiddenIdentifierSchema = require('./schemas/general/hidden-identifier-schema')()
const moduleSchema = require('./schemas/general/module-schema')()
const packageSchema = require('./schemas/general/package-schema')()
const definitionSchema = require('./schemas/definition/definition-schema')()
const functionSchema = require('./schemas/definition/function-schema')()
const tupleSchema = require('./schemas/definition/tuple-schema')()
const structSchema = require('./schemas/definition/struct-schema')()
const variableSchema = require('./schemas/definition/variable-schema')()
const valueSchema = require('./schemas/value/value-schema')()
const callSchema = require('./schemas/value/call-schema')()
const variableRefSchema = require('./schemas/value/variable-ref-schema')()
const stringLiteralSchema = require('./schemas/value/string-literal-schema')()
const integerLiteralSchema = require('./schemas/value/integer-literal-schema')()
const tupleLiteralSchema = require('./schemas/value/tuple-literal-schema')()
const structLiteralSchema = require('./schemas/value/struct-literal-schema')()

const ajv = new Ajv()
const validate = ajv
  .addSchema(definitionSchema)
  .addSchema(stringLiteralSchema)
  .addSchema(integerLiteralSchema)
  .addSchema(tupleLiteralSchema)
  .addSchema(structLiteralSchema)
  .addSchema(identifierSchema)
  .addSchema(hiddenIdentifierSchema)
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
