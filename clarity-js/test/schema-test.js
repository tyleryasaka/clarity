/* globals describe, it */

const Ajv = require('ajv')
const assert = require('assert')

const identifierSchema = require('../schemas/identifier-schema')()
const hiddenIdentifierSchema = require('../schemas/hidden-identifier-schema')()
const elementEnumSchema = require('../schemas/element-enum-schema')()
const valueSchema = require('../schemas/value-schema')()
const callSchema = require('../schemas/call-schema')()
const variableSchema = require('../schemas/variable-schema')()
const variableRefSchema = require('../schemas/variable-ref-schema')()
const functionSchema = require('../schemas/function-schema')()
const tupleSchema = require('../schemas/tuple-schema')()
const structSchema = require('../schemas/struct-schema')()
const moduleSchema = require('../schemas/module-schema')()
const packageSchema = require('../schemas/package-schema')()

describe('schemas', function () {
  describe('identifierSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.compile(identifierSchema)
    it('should validate', function () {
      assert.ok(validate('asdf-123'))
      assert.ok(validate('123_asdf-123'))
      assert.ok(validate('asdf'))
      assert.ok(!validate('asdf 123'))
    })
  })

  describe('hiddenIdentifierSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.compile(hiddenIdentifierSchema)
    it('should validate', function () {
      assert.ok(validate('asdf123'))
      assert.ok(validate('asdf'))
      assert.ok(!validate('asdf 123'))
      assert.ok(!validate('asdf-123'))
      assert.ok(!validate('asdf_adsf'))
    })
  })
})
