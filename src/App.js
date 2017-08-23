import React, { Component } from 'react';
import { TabContainer, NavigationBar, AnimatedIcon, SideBar, Text, StatusCard } from '@watson-iot/ui-components-react';
import { ThemeProvider, Button, TextInput, TextArea, SearchInput, Spinner } from '@watson-iot/ui-primitives-react'
//import logo from './logo.svg';
import styles from './App.css';

const Help = () => {
  return (
    <div>
    <div className="help-dropdown">
    <h2> Watson IoT Platform Help </h2>
    <div className="search">
      <TextInput placeholder="What would you like help with?" className="searchText" />
      <Button icon="search" />
    </div>
    <div className ="shortcuts">
      <h4> Key Shortcuts </h4>
    </div>
    <div className="cards">
      <StatusCard
        title="Create a board"
        additionalText=""
        description="A board is a component in the platform that acts as a container for an array of cards."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Create a card"
        additionalText=""
        description="A card is a way of visualizing device data from a connected instance in the platform."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Add a Device Type"
        additionalText=""
        description="Register a new Device Type."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Add a Device"
        additionalText=""
        description="Register a new Device."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Add a rule"
        additionalText=""
        description="A rule is to create alerts or trigger actions when trigger conditions are met for a device."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Add a rule"
        additionalText=""
        description="A rule is to create alerts or trigger actions when trigger conditions are met for a device."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Add a rule"
        additionalText=""
        description="A rule is to create alerts or trigger actions when trigger conditions are met for a device."
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
    </div>
    </div>
  	<div className="footer">
			<div className="doc">
				<div className="button"><a>Documentation</a></div>
			</div>
		</div>
    </div>
  );
}

const Org = () => {
  return (
    <div className="org-dropdown">
		<div className="titlearea">
			<h3>ORG NAME</h3>
			<h5>ID: ORG ID</h5>
			<div className="datausage">
				<div className="label"><h6 className="small">Data Remaining: 172.1MB</h6></div>
				<div className="graph"><a>14% Used</a><Spinner width={50} height={50} /></div>
			</div>
		</div>
    <div className ="org-count">
      <Text> Other organizations (count) </Text>
    </div>
    <div className="org-cards">
      <StatusCard
        title="Org name 1"
        additionalText=""
        description="ID:KJFH74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 2"
        additionalText=""
        description="ID:EGTFH74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 3"
        additionalText=""
        description="ID:JFTFH74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 4"
        additionalText=""
        description="ID:YUIY74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 5"
        additionalText=""
        description="ID:QWEFH74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 6"
        additionalText=""
        description="ID:DSDFH74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 7"
        additionalText=""
        description="ID:098J74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
      <StatusCard
        title="Org name 8"
        additionalText=""
        description="ID:098J74"
        isDraft={false}
        isTransparent={false}
        options={[<Button icon="rowTwizzly" design="transparent" />]}
        displayOnHover={true}
      />
    </div>
  	<div className="footer2">
			<div className="extralinks">
				<div className="item"><a>Terms</a></div>
				<div className="item"><a>Privacy</a></div>
				<div className="item"><a>Support</a></div>
				<div className="item"><a>Service Status</a></div>
			</div>
			<div className="logout">
				<div className="button"><a>Logout of Platform</a></div>
			</div>
		</div>
    </div>
  );
}

class HelpPanel extends Component {
   constructor(props) {
    super(props)
    this.state = {
      selectedId: 'browser',
    }
  }


  render = () => {
  const {id, isVisible} = this.props

  var content;
  if(id==="help" && isVisible===true) {
    content=(<Help />)
  } else if (id==="org" && isVisible===true) {
    content=(<Org />)
  } else if (id==="notification" && isVisible===true) {
    content=(<div> {id} </div>)
  } else {
    content=(<div> </div>)
  }

  return content;
  }
}

class App extends Component {
   constructor(props) {
    super(props)
    this.state = {
      id: null,
      isVisible: false
    }
  }

  toggleVisibility = (id) => {

    if(id !== this.state.id) {
      this.setState({
        id: id,
        isVisible: true
      })
    } else {
      this.setState({
        id: id,
        isVisible: !this.state.isVisible
      })
    }
  }

  render = () => {
  return (
    <div>
        <div className="topnav">
          <Button
            design="transparent"
            icon="notification"
            onClick = {() => this.toggleVisibility("notification")}
          />
          <Button
            design="transparent"
            icon="help"
            onClick = {() => this.toggleVisibility("help")}
          />
          <Button
            design="transparent"
            value={"Org"}
            icon="user"
            iconPosition="right"
            onClick = {() => this.toggleVisibility("org")}
            id="org"
          />
        </div>
        <div className="sidebar">
          <SideBar
                isVisible={this.state.isVisible}
                width={400}
                position={"right"}
                onClose={() => this.toggleVisibility(null)}
                hasAutoPadding={false}
                topMargin={56}
          >
            <div>
              <HelpPanel id={this.state.id} isVisible={this.state.isVisible} />
            </div>
          </SideBar>
        </div>
      </div>
    )
  }
}

export default App;

