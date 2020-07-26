import React, { Component } from 'react'
import { remote } from 'electron'
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Tab,
  Tabs
} from '@blueprintjs/core'
import EditFunction from './edit-function'
const electronFs = remote.require('fs')
const electronPath = remote.require('path')

class MainNav extends Component {
  constructor () {
    super()
    this.state = {
      functions: [],
      currentFnIndex: null
    }
  }

  async openDialog () {
    const dialogResult = await remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Tactile Program', extensions: ['json'] }
      ]
    })
    if (!dialogResult.canceled && dialogResult.filePaths.length) {
      electronFs.readFile(
        electronPath.resolve(__dirname, dialogResult.filePaths[0]),
        'utf-8',
        (err, data) => {
          if (err) throw err
          try {
            const program = JSON.parse(data)
            console.log(program)
            console.log(dialogResult.filePaths[0])
            this.setState({ functions: program.functions })
          } catch (e) {
            console.log(e)
          }
        }
      )
    }
  }

  handleTabChange (navbarTabId) {
    this.setState({ currentFnIndex: navbarTabId })
  }

  handleFunctionChange (functionIndex, updatedFn) {
    const functions = JSON.parse(JSON.stringify(this.state.functions))
    functions[functionIndex] = updatedFn
    this.setState({ functions })
  }

  render () {
    const { currentFnIndex, functions } = this.state
    const currentFn = (currentFnIndex !== null) ? functions[currentFnIndex] : {}
    return (
      <>
        <Navbar className={Classes.DARK}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Tactile</NavbarHeading>
            <NavbarDivider />
            <Button className={Classes.MINIMAL} icon='document' text='Load Program' onClick={this.openDialog.bind(this)} />
          </NavbarGroup>
        </Navbar>
        <Tabs
          animate
          renderActiveTabPanelOnly
          vertical
          onChange={this.handleTabChange.bind(this)}
          className={Classes.TABS}
        >
          {this.state.functions.map((fn, index) => {
            return (
              <Tab id={index} key={index} title={fn.name} panel={(
                <EditFunction fn={currentFn} onChangeFn={(updatedFn) => this.handleFunctionChange(index, updatedFn)} />
              )} />
            )
          })}
        </Tabs>
      </>
    )
  }
}

export default MainNav
