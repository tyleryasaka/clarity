const _ = require('underscore')
const validateSyntax = require('./validate-syntax')
const validateReferences = require('./validate-references')
const validateDomain = require('./validate-domain')

const {
  validityResult,
  chainIfValid
} = require('./validation-utils')

function validate (program, libraries = {}) {
  return chainIfValid([
    () => validityResult(_.isObject(program), 'invalid-input', []),
    () => validateSyntax(program),
    () => validateReferences(program, libraries),
    () => validateDomain(program, libraries)
  ])
}

module.exports = validate
