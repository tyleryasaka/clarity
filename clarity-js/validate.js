const _ = require('underscore')

module.exports = function validate (program) {
  const errors = []
  try {
    const context = { errors, program }
    validateProgram(program, context)
    validateUnique(program.definitions, 'id', context)
    program.definitions.forEach(d => {
      validateDefinition(d, context)
    })
  } catch (e) {
    console.log(e)
  }
  return errors
}

function validateRequiredProps (obj, props, context) {
  props.forEach(p => {
    if (_.property(p)(obj) === undefined) {
      context.errors.push(`Missing property: ${p}`)
    }
  })
}

function oneOf (val, options, context) {
  if (!_.includes(options, val)) {
    context.errors.push(`${val} not allowed as a value`)
  }
}

function validateUnique (items, key, context) {
  const ids = items.map(i => i[key])
  if (_.uniq(ids).length !== items.length) {
    context.errors.push(`Duplicate ids`)
  }
}

function validateProgram (program, context) {
  const requiredProps = ['definitions']
  validateRequiredProps(program, requiredProps, context)
}

function validateDefinition (d, context) {
  const requiredProps = ['type', 'id', 'name', 'description', 'params', 'domain', 'body']
  const paramRefs = []
  validateRequiredProps(d, requiredProps, context)
  validateParams(d.params, context)
  validateDomain(d.domain, paramRefs, context)
  // TODO: validate value matches domain
  validateValue(d.body, paramRefs, context)
  validateParamRefs(d.params, paramRefs, context)
}

function validateParams (params, context) {
  const requiredProps = ['id', 'name', 'description']
  params.forEach(param => {
    validateRequiredProps(param, requiredProps, context)
  })
  validateUnique(params, 'id', context)
}

function validateDomain (domain, paramRefs, context) {
  validateVariable(domain, paramRefs, context)
}

function validateValue (value, paramRefs, context) {
  validateVariable(value, paramRefs, context)
  if (!value.variable) {
    const v = value.v
    validateRequiredProps(v, ['type'], context)
    oneOf(v.type, ['application', 'ifelse', 'integer-literal', 'string-literal', 'bool-literal', 'complex-literal', 'definition-literal'], context)
    if (v.type === 'application') {
      validateApplication(v, paramRefs, context)
    }
    if (v.type === 'ifelse') {
      validateIfelse(v, paramRefs, context)
    }
  }
}

function validateApplication (app, paramRefs, context) {
  const requiredProps = ['definition', 'args']
  validateRequiredProps(app, requiredProps, context)
  // TODO: validate definition is a valid reference
  validateArgs(app.args, paramRefs, context)
}

function validateIfelse (ifelse, paramRefs, context) {
  const requiredProps = ['condition', 'if', 'else']
  validateRequiredProps(ifelse, requiredProps, context)
  // TODO: validate condition boolean domain
  validateValue(ifelse.condition, paramRefs, context)
  // TODO: validate if and else same domain
  validateValue(ifelse.if, paramRefs, context)
  validateValue(ifelse.else, paramRefs, context)
}

function validateArgs (args, paramRefs, context) {
  const requiredProps = ['p', 'value']
  args.forEach(arg => {
    validateRequiredProps(arg, requiredProps, context)
    // TODO: validate p and value in same domain
    // TODO: validate p maps to a param on definition
    validateValue(arg.value, paramRefs, context)
  })
}

function validateVariable (item, paramRefs, context) {
  const requiredProps = ['variable']
  validateRequiredProps(item, requiredProps, context)
  if (item.variable) {
    validateRequiredProps(item, ['p'], context)
    paramRefs.push(item.p)
  } else {
    validateRequiredProps(item, ['v'], context)
  }
}

function validateParamRefs (params, paramRefs, context) {
  const paramIds = params.map(param => param.id)
  if (_.difference(paramRefs, paramIds).length !== 0) {
    context.errors.push('Referenced param(s) not defined')
  }
  if (_.difference(paramIds, paramRefs).length !== 0) {
    context.errors.push('Unused parameter definition')
  }
}
