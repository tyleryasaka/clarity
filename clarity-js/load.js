module.exports = function validate (json) {
  const errors = []
  const programJSON = JSON.parse(json)
  const entitiesJSON = programJSON.entities
  const entitiesRef = {}

  entitiesJSON.forEach(e => {
    if (entitiesRef[e.id] !== undefined) {
      errors.push(`Duplicate entity with id ${e.id}`)
    }
    entitiesRef[e.id] = {}
  })

  entitiesJSON.forEach(e => {
    const entity = entitiesRef[e.id]

    entity.params = {}
    e.params.forEach(p => {
      const param = entity.params[p.id]
      if (param !== undefined) {
        errors.push(`Entity ${e.id}: Duplicate param with id ${p.id}`)
      }
      entity.params[p.id] = {
        name: p.name,
        description: p.description
      }
    })

    entity.domain = processAbstractable(e.id, entity, e.domain, errors)
  })

  return {
    program: errors.length ? null : entitiesRef,
    errors
  }
}

function processAbstractable (entityId, entity, abstractable, errors) {
  if (abstractable.t === 'd') {
    if (entity.params[abstractable.p] === undefined) {
      errors.push(`Entity ${entityId}: Param ${abstractable.p} does not exist`)
    }
  }
  return abstractable
}
