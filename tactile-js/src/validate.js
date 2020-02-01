const _ = require('underscore')
const validateSyntax = require('./validate-syntax')
const validateReferences = require('./validate-references')
const validateDomain = require('./validate-domain')

const {
  validityResult,
  chainIfValid
} = require('./utils')

function validate (program) {
  return chainIfValid([
    () => validityResult(_.isObject(program), 'invalid-input', []),
    () => validateSyntax(program),
    () => validateReferences(program),
    () => validateDomain(program)
  ])
}

module.exports = validate
