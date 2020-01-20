/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const validate = require('../validate')

describe('validate', function () {
  it('should not allow duplicate definition ids', function () {
    const errors = validate({
      definitions: [
        { id: '1', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { type: 'string-literal' } }, body: { variable: false, v: { type: 'string-literal' } } },
        { id: '2', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { type: 'string-literal' } }, body: { variable: false, v: { type: 'string-literal' } } },
        { id: '1', type: 'definition', name: '', description: '', valueParams: [], domainParams: [], domain: { variable: false, v: { type: 'string-literal' } }, body: { variable: false, v: { type: 'string-literal' } } }
      ]
    })
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Duplicate ids')
  })

  it('should not allow duplicate param ids', function () {
    const errors = validate({
      definitions: [
        {
          id: '1',
          type: 'definition',
          name: '',
          description: '',
          domainParams: [ { id: '11', name: '', description: '' }, { id: '11', name: '', description: '' } ],
          valueParams: [],
          domain: { variable: true, p: '11' },
          body: { variable: false, v: { type: 'string-literal' } }
        }
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
          valueParams: [ { id: '1', name: '', description: '', domain: { variable: true, p: '2' } } ],
          domain: { variable: true, p: '2' },
          body: { variable: true, p: '1' }
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
