/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const validate = require('../src/validate')

describe('validate', function () {
  it('should return an error for invalid input', function () {
    // programJSON is a raw string (not parsed as JSON object), thus invalid
    const result = validate(programJSON)
    assert.strictEqual(result.errorCode, 'invalid-input')
    assert.strictEqual(result.isValid, false)
  })

  it('should validate a valid program without errors', function () {
    const result = validate(JSON.parse(programJSON))
    assert.strictEqual(result.errorCode, '')
    assert.ok(result.isValid)
  })
})
