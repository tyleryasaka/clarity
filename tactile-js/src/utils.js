function validityResult (isValid, errorCode) {
  return {
    isValid,
    errorCode: isValid ? '' : errorCode,
    errorPath: []
  }
}

module.exports = {
  validityResult
}
