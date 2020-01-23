/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const { validate } = require('../validate')

describe('validate', function () {
  it('should not allow duplicate definition ids', function () {
    const errors = validate({
      definitions: [
        { id: '1', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { domainType: 'string' } }, body: { variable: false, v: { type: 'string-literal' } } },
        { id: '2', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { domainType: 'string' } }, body: { variable: false, v: { type: 'string-literal' } } },
        { id: '1', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { domainType: 'string' } }, body: { variable: false, v: { type: 'string-literal' } } }
      ]
    })
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Duplicate ids')
  })

  it('should not allow reference of missing params', function () {
    const errors = validate({
      definitions: [
        {
          id: '1',
          type: 'definition',
          name: '',
          description: '',
          domainParams: [],
          valueParams: [],
          domain: { variable: false, v: { domainType: 'string' } },
          body: { variable: true, p: 1 }
        }
      ]
    })
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Referenced param(s) not defined')
  })

  it('should validate a valid program without errors', function () {
    const errors = validate(JSON.parse(programJSON))
    assert.strictEqual(errors.length, 0)
  })
})
