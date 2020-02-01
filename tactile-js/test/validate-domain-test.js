/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const validateDomain = require('../src/validate-domain')

describe('validateDomain', function () {
  it('should validate a valid program without errors', function () {
    const result = validateDomain(JSON.parse(programJSON))
    assert.ok(result.isValid)
  })
})
