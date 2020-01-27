import React, { Component } from 'react'
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Tab,
    Tabs,
    InputGroup,
    TabId
} from '@blueprintjs/core'

interface Props {
  hello?: string
}

interface State {
  hello?: string
  navbarTabId: TabId
}

class MainNav extends Component<Props, State> {
  public state: State = {
    hello: 'world',
    navbarTabId: 'tab-1'
  }

  render() {
    return (
      <>
        <Navbar className={Classes.DARK}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Tactile</NavbarHeading>
            <NavbarDivider />
            <Button className={Classes.MINIMAL} icon="home" text="Home" />
            <Button className={Classes.MINIMAL} icon="document" text="Files" />
          </NavbarGroup>
        </Navbar>
        <Tabs
          animate={true}
          renderActiveTabPanelOnly={true}
          vertical={true}
          onChange={this.handleTabChange}
          className={Classes.TABS}
        >
          <Tab id="tab-1" title="React" panel={<ReactPanel />} />
          <Tab id="tab-2" title="Angular" panel={<AngularPanel />} />
          <Tab id="tab-3" title="Ember" panel={<EmberPanel />} />
          <Tabs.Expander />
        </Tabs>
      </>
    )
  }

  private handleTabChange = (navbarTabId: TabId) => this.setState({ navbarTabId })
}

const ReactPanel: React.SFC<{}> = () => (
  <div>
    <p className={Classes.RUNNING_TEXT}>
      Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology
      stack, it's easy to try it out on a small feature in an existing project.
    </p>
  </div>
)

const AngularPanel: React.SFC<{}> = () => (
  <div>
    <p className={Classes.RUNNING_TEXT}>
      HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic
      views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting
      environment is extraordinarily expressive, readable, and quick to develop.
    </p>
  </div>
)

const EmberPanel: React.SFC<{}> = () => (
  <div>
    <p className={Classes.RUNNING_TEXT}>
      Ember.js is an open-source JavaScript application framework, based on the model-view-controller (MVC)
      pattern. It allows developers to create scalable single-page web applications by incorporating common idioms
      and best practices into the framework. What is your favorite JS framework?
    </p>
  </div>
)

export default MainNav;
