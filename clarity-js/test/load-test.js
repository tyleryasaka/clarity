/* globals describe, it */

const fs = require('fs')
const assert = require('assert')
const { load } = require('../index')

const entireProgram = fs.readFileSync('./test/stubs/program.json', 'utf8')

describe('load', function () {
  describe('all together', function () {
    it('should validate', function () {
      const isValid = load(entireProgram)
      assert.ok(isValid)
    })
  })
})
