/* globals describe, it */

const fs = require('fs')
const assert = require('assert')

const programJSON = fs.readFileSync('./test/stubs/program.json', 'utf8')
const mathProgramJSON = fs.readFileSync('./test/stubs/valid/math.json', 'utf8')
const evaluate = require('../src/evaluate')

describe('evaluate', function () {
  it('should correctly evaluate a valid function', function () {
    const run1 = evaluate(JSON.parse(programJSON), 3)
    assert.strictEqual(run1.result, 'hello')
    const run2 = evaluate(JSON.parse(programJSON), 4)
    assert.strictEqual(run2.result, 'world')
  })

  it('should correctly a built-in math function', function () {
    const run1 = evaluate(JSON.parse(mathProgramJSON), 0)
    assert.strictEqual(run1.result, '4')
  })
})
