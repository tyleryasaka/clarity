/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/syntax-1.json', 'utf8')
const validateSyntax = require('../validate-syntax')

describe('validateSyntax', function () {
  it('should validate a valid program without errors', function () {
    const result = validateSyntax(JSON.parse(programJSON))
    assert.strictEqual(result.isValid, true)
  })
})
