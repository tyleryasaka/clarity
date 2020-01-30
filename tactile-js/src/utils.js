const _ = require('underscore')

function validityResult (isValid, errorCode, errorPath) {
  return {
    isValid,
    errorCode: isValid ? '' : errorCode,
    errorPath
  }
}

function chainIfValid (fnList) {
  const result = _.first(fnList)()
  if (fnList.length > 1) {
    return result.isValid ? chainIfValid(_.rest(fnList)) : result
  } else {
    return result
  }
}

function validateEach (list, fn) {
  const chainedCalls = list.map((item, i) => {
    return () => fn(item, i)
  })
  return chainIfValid(chainedCalls)
}

module.exports = {
  validityResult,
  chainIfValid,
  validateEach
}
