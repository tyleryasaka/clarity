import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FocusStyleManager, Classes } from '@blueprintjs/core'
import MainNav from './components/main-nav'
import './styles/app.css'

FocusStyleManager.onlyShowFocusOnTabs()

const Index = () => {
  return <div className={Classes.DARK}>
    <MainNav />
  </div>
}

ReactDOM.render(<Index />, document.getElementById('app'))
