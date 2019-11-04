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
      assert.ok(validate('0'))
      assert.ok(!validate('asdf 123'))
      assert.ok(!validate('asdf-123'))
      assert.ok(!validate('asdf_adsf'))
    })
  })

  describe('elementEnumSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.compile(elementEnumSchema)
    it('should validate', function () {
      assert.ok(validate('package'))
      assert.ok(validate('module'))
      assert.ok(validate('function'))
      assert.ok(validate('tuple'))
      assert.ok(validate('struct'))
      assert.ok(!validate('asdf'))
    })
  })

  describe('variableRefSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .compile(variableRefSchema)
    it('should validate', function () {
      assert.ok(validate({ 'variable': 'asdf123' }))
      assert.ok(validate({ 'variable': '1' }))
      assert.ok(!validate({ 'variable': 'asdf-123' }))
      assert.ok(!validate({ 'variable': 'asdf 123' }))
      assert.ok(!validate({ 'hello': 'world' }))
    })
  })

  describe('tupleSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(elementEnumSchema)
      .compile(tupleSchema)
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
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(elementEnumSchema)
      .compile(structSchema)
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
      .compile(valueSchema)
    it('should validate', function () {
      assert.ok(validate('hello'))
      assert.ok(validate(1))
      assert.ok(validate('1'))
      assert.ok(validate({
        'function': '123abc',
        'args': { 'hello': 'world' }
      }))
      assert.ok(validate({ 'variable': 'abc123' }))
      assert.ok(!validate({ 'hello': 'world' }))
    })
  })

  describe('callSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .compile(callSchema)
    it('should validate', function () {
      assert.ok(validate({
        'function': '123abc',
        'args': { 'hello': 'world' }
      }))
      assert.ok(validate({
        'function': '123abc',
        'args': {
          'hello': {
            'function': '123abc',
            'args': { 'world': 1 }
          }
        }
      }))
      assert.ok(!validate({
        'function': '123abc'
      }))
    })
  })

  describe('variableSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(callSchema)
      .compile(variableSchema)
    it('should validate', function () {
      assert.ok(validate({
        'type': '1',
        'name': 'a',
        'description': 'hello world!',
        'value': 123
      }))
      assert.ok(validate({
        'type': '1',
        'name': 'a',
        'description': 'hello world!',
        'value': {
          'function': '123abc',
          'args': { 'hello': 'world' }
        }
      }))
      assert.ok(!validate({
        'type': '1',
        'description': 'hello world!',
        'value': 123
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
    const validate = ajv.addSchema(elementEnumSchema)
      .addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
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
        'variables': [
          {
            'type': '1',
            'name': 'a',
            'description': 'hello world!',
            'value': {
              'function': '123abc',
              'args': { 'hello': 'world' }
            }
          }
        ],
        'returnValue': { 'variable': 'abc123' }
      }))
    })
  })

  describe('moduleSchema', function () {
    const ajv = new Ajv()
    const validate = ajv.addSchema(elementEnumSchema)
      .addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
      .addSchema(functionSchema)
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
    const validate = ajv.addSchema(elementEnumSchema)
      .addSchema(identifierSchema)
      .addSchema(hiddenIdentifierSchema)
      .addSchema(variableRefSchema)
      .addSchema(valueSchema)
      .addSchema(callSchema)
      .addSchema(variableSchema)
      .addSchema(functionSchema)
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
