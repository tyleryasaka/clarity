import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from '@blueprintjs/core'
import './styles/app.css'

const Index = () => {
  return <div>
    Hello world!
    <Button intent="success" text="button content" />
  </div>
}

ReactDOM.render(<Index />, document.getElementById('app'))
