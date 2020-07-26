import React from 'react'
import { Select } from '@blueprintjs/select'
import { MenuItem, Button } from '@blueprintjs/core'

export default function EditDomain ({ domain, onChangeDomain }) {
  const domainTypes = ['string', 'integer', 'bool']

  const onChangeDomainType = (newDomainType) => {
    const domainCopy = JSON.parse(JSON.stringify(domain))
    domainCopy.child.child = newDomainType
    onChangeDomain(domainCopy)
  }

  if ((domain.variable !== 'false') || (domain.child.childType !== 'domain-literal')) {
    return '[TODO unhandled domain type]'
  }

  return (
    <>
      <p />
      <span>Domain: </span>
      <Select
        items={domainTypes}
        itemRenderer={(item, { handleClick }) => <MenuItem key={item} onClick={handleClick} text={item} />}
        onItemSelect={onChangeDomainType}
        filterable={false}
      >
        <Button
          rightIcon='caret-down'
          text={domain.child.child ? `${domain.child.child}` : '(No selection)'}
        />
      </Select>
    </>
  )
}
