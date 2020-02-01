/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const valid1 = fs.readFileSync('./test/stubs/program.json', 'utf8')
const invalid1 = fs.readFileSync('./test/stubs/invalid-references/nonexistent-function.json', 'utf8')
const invalid2 = fs.readFileSync('./test/stubs/invalid-references/nonexistent-param.json', 'utf8')
const validateReferences = require('../src/validate-references')

describe('validateReferences', function () {
  it('should not allow reference of missing function', function () {
    const result = validateReferences(JSON.parse(invalid1))
    assert.strictEqual(result.errorCode, 'nonexistent-function')
    assert.strictEqual(result.isValid, false)
  })

  it('should not allow reference of missing params', function () {
    const result = validateReferences(JSON.parse(invalid2))
    assert.strictEqual(result.errorCode, 'nonexistent-parameter')
    assert.strictEqual(result.isValid, false)
  })

  it('should validate a valid program without errors', function () {
    const result = validateReferences(JSON.parse(valid1))
    assert.ok(result.isValid)
  })
})
