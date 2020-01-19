/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const load = require('../load')

describe('load', function () {
  it('should not allow duplicate entity ids', function () {
    const { errors } = load(JSON.stringify({
      entities: [
        { id: '1', params: [] },
        { id: '2', params: [] },
        { id: '1', params: [] }
      ]
    }))
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Duplicate entity with id 1')
  })

  it('should not allow duplicate param ids', function () {
    const { errors } = load(JSON.stringify({
      entities: [
        { id: '1',
          params: [
            { id: '11' },
            { id: '11' }
          ]
        }
      ]
    }))
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Entity 1: Duplicate param with id 11')
  })

  it('should load a valid program without errors', function () {
    const { errors } = load(programJSON)
    assert.strictEqual(errors.length, 0)
  })
})
