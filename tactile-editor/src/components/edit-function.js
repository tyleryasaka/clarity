import React from 'react'
import EditDomain from './edit-domain'

export default function EditFunction ({ fn, onChangeFn }) {
  const onChangeName = (e) => {
    const fnCopy = JSON.parse(JSON.stringify(fn))
    fnCopy.name = e.target.value
    onChangeFn(fnCopy)
  }

  const onChangeDescription = (e) => {
    const fnCopy = JSON.parse(JSON.stringify(fn))
    fnCopy.description = e.target.value
    onChangeFn(fnCopy)
  }

  const onChangeDomain = (updatedDomain) => {
    const fnCopy = JSON.parse(JSON.stringify(fn))
    fnCopy.domain = updatedDomain
    onChangeFn(fnCopy)
  }

  return (
    <>
      <p />
      <div className='bp3-input-group'>
        <input type='text' className='bp3-input' placeholder='Function name' value={fn.name} onChange={onChangeName} />
      </div>
      <div className='bp3-input-group'>
        <textarea className='bp3-input' placeholder='Function description' value={fn.description} onChange={onChangeDescription} />
      </div>
      <EditDomain domain={fn.domain} onChangeDomain={onChangeDomain} />
    </>
  )
}
