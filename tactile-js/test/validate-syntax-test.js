/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const invalid1 = fs.readFileSync('./test/stubs/invalid-syntax/invalid1.json', 'utf8')
const invalid2 = fs.readFileSync('./test/stubs/invalid-syntax/invalid2.json', 'utf8')
const validateSyntax = require('../src/validate-syntax')

describe('validateSyntax', function () {
  it('should validate a valid program without errors', function () {
    const result = validateSyntax(JSON.parse(programJSON))
    assert.strictEqual(result.errorCode, '')
    assert.ok(result.isValid)
  })

  it('should not validate nonsense programs', function () {
    const result = validateSyntax(JSON.parse(invalid1))
    assert.strictEqual(result.isValid, false)
    const result2 = validateSyntax(JSON.parse(invalid2))
    assert.strictEqual(result2.isValid, false)
  })
})
