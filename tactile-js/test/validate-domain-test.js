/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const valid1 = fs.readFileSync('./test/stubs/program.json', 'utf8')
const valid2 = fs.readFileSync('./test/stubs/valid/opt.json', 'utf8')
const validateDomain = require('../src/validate-domain')

describe('validateDomain', function () {
  it('should validate a valid program without errors', function () {
    const result = validateDomain(JSON.parse(valid1))
    assert.ok(result.isValid)
  })

  it('should validate opts', function () {
    const result = validateDomain(JSON.parse(valid2))
    assert.strictEqual(result.errorCode, '')
    assert.ok(result.isValid)
  })
})
