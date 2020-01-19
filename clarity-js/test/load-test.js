/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const load = require('../load')

describe('load', function () {
  it('should not allow duplicate entity ids', function () {
    const { errors } = load(JSON.stringify({
      entities: [
        { id: '1', params: [], domain: { t: 's', v: '' } },
        { id: '2', params: [], domain: { t: 's', v: '' } },
        { id: '1', params: [], domain: { t: 's', v: '' } }
      ]
    }))
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Duplicate entity with id 1')
  })

  it('should not allow duplicate param ids', function () {
    const { errors } = load(JSON.stringify({
      entities: [
        { id: '1',
          params: [ { id: '11' }, { id: '11' } ],
          domain: { t: 's', v: '' }
        }
      ]
    }))
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Entity 1: Duplicate param with id 11')
  })

  it('should not allow reference of missing params', function () {
    const { errors } = load(JSON.stringify({
      entities: [
        { id: '1',
          params: [ { id: '1' } ],
          domain: { t: 'd', p: '2' }
        }
      ]
    }))
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0], 'Entity 1: Param 2 does not exist')
  })

  it('should load a valid program without errors', function () {
    const { errors } = load(programJSON)
    assert.strictEqual(errors.length, 0)
  })
})
