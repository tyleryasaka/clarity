/* globals describe, it */

const Ajv = require('ajv')
const assert = require('assert')

const identifierSchema = require('../schemas/general/identifier-schema')()
const hiddenIdentifierSchema = require('../schemas/general/hidden-identifier-schema')()
const moduleSchema = require('../schemas/general/module-schema')()
const packageSchema = require('../schemas/general/package-schema')()
const definitionSchema = require('../schemas/definition/definition-schema')()
const functionSchema = require('../schemas/definition/function-schema')()
const tupleSchema = require('../schemas/definition/tuple-schema')()
const structSchema = require('../schemas/definition/struct-schema')()
const variableSchema = require('../schemas/definition/variable-schema')()
const valueSchema = require('../schemas/value/value-schema')()
const callSchema = require('../schemas/value/call-schema')()
const variableRefSchema = require('../schemas/value/variable-ref-schema')()
const stringLiteralSchema = require('../schemas/value/string-literal-schema')()
const integerLiteralSchema = require('../schemas/value/integer-literal-schema')()
const tupleLiteralSchema = require('../schemas/value/tuple-literal-schema')()
const structLiteralSchema = require('../schemas/value/struct-literal-schema')()

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
      assert.ok(validate('0'))
      assert.ok(validate('abc.123'))
      assert.ok(!validate('asdf 123'))
      assert.ok(!validate('asdf-123'))
      assert.ok(!validate('asdf_adsf'))
    })
  })

  describe('variableRefSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .compile(variableRefSchema)
    it('should validate', function () {
      assert.ok(validate({ 'element': 'variable-ref', 'variable': 'asdf123' }))
      assert.ok(validate({ 'element': 'variable-ref', 'variable': '1' }))
      assert.ok(!validate({ 'element': 'variable-ref', 'variable': 'asdf-123' }))
      assert.ok(!validate({ 'element': 'variable-ref', 'variable': 'asdf 123' }))
      assert.ok(!validate({ 'element': 'variable-ref', 'hello': 'world' }))
    })
  })

  describe('tupleSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema).compile(tupleSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'tuple',
        'name': '123abc',
        'description': 'hello world!',
        'members': ['123', '456', 'abc', 'abc123']
      }))
      assert.ok(!validate({
        'element': 'tuple',
        'name': '123abc',
        'description': 'hello world!',
        'members': ['123', '456', 'abc', 'abc 123']
      }))
    })
  })

  describe('structSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema).compile(structSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'struct',
        'name': '123abc',
        'description': 'hello world!',
        'properties': [
          { 'type': 'hello', 'name': 'world' },
          { 'type': '1', 'name': '2' },
          { 'type': 'abc123', 'name': 'abc123' }
        ]
      }))
      assert.ok(!validate({
        'element': 'struct',
        'name': '123abc',
        'description': 'hello world!',
        'properties': [
          { 'type': 'hello' },
          { 'type': '1' },
          { 'type': 'abc123' }
        ]
      }))
    })
  })

  describe('valueSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(callSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .compile(valueSchema)
    it('should validate', function () {
      assert.ok(validate({ 'element': 'string-literal', 'value': 'hello' }))
      assert.ok(validate({ 'element': 'string-literal', 'value': '1' }))
      assert.ok(validate({
        'element': 'call',
        'function': '123abc',
        'args': { 'hello': { 'element': 'string-literal', 'value': 'world' } }
      }))
      assert.ok(validate({
        'element': 'variable-ref',
        'variable': '7'
      }))
      assert.ok(!validate({ 'hello': 'world' }))
    })
  })

  describe('integerLiteralSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(callSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .compile(integerLiteralSchema)
    it('should validate', function () {
      assert.ok(validate({ 'element': 'integer-literal', 'value': '0' }))
      assert.ok(validate({ 'element': 'integer-literal', 'value': '9' }))
      assert.ok(validate({ 'element': 'integer-literal', 'value': '0101110' }))
      assert.ok(!validate({ 'element': 'integer-literal', 'value': '0101 110' }))
      assert.ok(!validate({ 'element': 'integer-literal', 'value': '1,230' }))
      assert.ok(!validate({ 'element': 'integer-literal', 'value': '123abc' }))
    })
  })

  describe('stringLiteralSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(callSchema)
      .addSchema(valueSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(structLiteralSchema)
      .compile(stringLiteralSchema)
    it('should validate', function () {
      assert.ok(validate({ 'element': 'string-literal', 'value': 'abc 123' }))
      assert.ok(validate({ 'element': 'string-literal', 'value': 'hello world!' }))
      assert.ok(validate({ 'element': 'string-literal', 'value': '0101110' }))
      assert.ok(validate({ 'element': 'string-literal', 'value': 'true' }))
      assert.ok(!validate({ 'element': 'string-literal', 'value': { 'hello': 'world' } }))
    })
  })

  describe('tupleLiteralSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(callSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(structLiteralSchema)
      .compile(tupleLiteralSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'tuple-literal',
        'members': [{ 'element': 'string-literal', 'value': '1' }]
      }))
      assert.ok(!validate({
        'element': 'tuple-literal',
        'members': ['abc 123']
      }))
    })
  })

  describe('structLiteralSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(callSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .compile(structLiteralSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'struct-literal',
        'properties': [{
          'name': '1',
          'value': { 'element': 'string-literal', 'value': '1' }
        }]
      }))
      assert.ok(!validate({
        'element': 'struct-literal',
        'properties': [{ 'element': 'string-literal', 'value': '1' }]
      }))
    })
  })

  describe('callSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .addSchema(valueSchema)
      .compile(callSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'call',
        'function': '123abc',
        'args': { 'hello': { 'element': 'string-literal', 'value': 'world' } }
      }))
      assert.ok(validate({
        'element': 'call',
        'function': '123abc',
        'args': {
          'hello': {
            'element': 'call',
            'function': '123abc',
            'args': { 'world': { 'element': 'string-literal', 'value': '1' } }
          }
        }
      }))
      assert.ok(!validate({
        'element': 'call',
        'function': '123abc'
      }))
    })
  })

  describe('variableSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .addSchema(callSchema)
      .compile(variableSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'variable',
        'type': '1',
        'name': 'a',
        'description': 'hello world!',
        'value': { 'element': 'string-literal', 'value': '123' }
      }))
      assert.ok(validate({
        'element': 'variable',
        'type': '1',
        'name': 'a',
        'description': 'hello world!',
        'value': {
          'element': 'call',
          'function': '123abc',
          'args': { 'hello': { 'element': 'string-literal', 'value': 'world' } }
        }
      }))
      assert.ok(!validate({
        'element': 'variable',
        'type': '1',
        'description': 'hello world!',
        'value': '123'
      }))
      assert.ok(!validate({
        'type': '1',
        'name': 'a',
        'description': 'hello world!',
        'value': false
      }))
    })
  })

  describe('functionSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
      .addSchema(definitionSchema)
      .addSchema(tupleSchema)
      .addSchema(structSchema)
      .compile(functionSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'function',
        'name': 'abc123',
        'description': 'hello world!',
        'returnType': 'abc123',
        'params': [
          { 'type': 'abc', 'name': '123' }
        ],
        'definitions': [
          {
            'element': 'variable',
            'name': 'a',
            'description': 'hello world!',
            'type': '1',
            'value': {
              'element': 'call',
              'function': '123abc',
              'args': { 'hello': { 'element': 'string-literal', 'value': 'world' } }
            }
          }
        ],
        'returnValue': { 'element': 'string-literal', 'value': 'abc-123' }
      }))
    })
  })

  describe('moduleSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
      .addSchema(functionSchema)
      .addSchema(definitionSchema)
      .addSchema(tupleSchema)
      .addSchema(structSchema)
      .compile(moduleSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'module',
        'name': 'abc123',
        'description': 'hello world!',
        'contents': [
          {
            'element': 'tuple',
            'name': '123abc',
            'description': 'hello world!',
            'members': ['123', '456', 'abc', 'abc123']
          }
        ]
      }))
    })
  })

  describe('packageSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(identifierSchema)
      .addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(stringLiteralSchema)
      .addSchema(integerLiteralSchema)
      .addSchema(tupleLiteralSchema)
      .addSchema(structLiteralSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
      .addSchema(functionSchema)
      .addSchema(definitionSchema)
      .addSchema(tupleSchema)
      .addSchema(structSchema)
      .addSchema(moduleSchema)
      .compile(packageSchema)
    it('should validate', function () {
      assert.ok(validate({
        'element': 'package',
        'name': 'abc123',
        'description': 'hello world!',
        'dictionary': {
          'abc': '123',
          'hello': 'world',
          '123': 'abc-123',
          'abc123': 'abc_123'
        },
        'contents': [
          {
            'element': 'module',
            'name': 'abc123',
            'description': 'hello world!',
            'contents': [
              {
                'element': 'tuple',
                'name': '123abc',
                'description': 'hello world!',
                'members': ['123', '456', 'abc', 'abc123']
              }
            ]
          }
        ]
      }))
    })
  })
})
