import React, { Component } from 'react';
import { TabContainer, NavigationBar, AnimatedIcon } from '@watson-iot/ui-components-react';
import { ThemeProvider, Button, TextInput } from '@watson-iot/ui-primitives-react'
//import logo from './logo.svg';
import styles from './App.css';


class App extends Component {
   constructor(props) {
    super(props)
    this.state = {
      selectedId: 'browser',
    }
  }

  onToggle = (id) => {
    this.setState({
      selectedId: id,
    })
  }

  help = () => {
    console.log("here")
    return(
      <div>
         <TextInput type="text" placeholder="Search..." />
         <Button
          onClick={() => window.alert('Search')}
          icon="search"
          design="primary"
        />
      </div>
    );
  }

  render = () => {

    var arr = [<Button
          onClick={() => window.alert('Usage')}
          value="Usage"
          icon="triangleDown"
          iconPosition="right"
          design="primary"
        />, <Button
          id="help"
          onClick={this.help}
          icon="info"
          design="primary"
        />, <Button
          onClick={() => window.alert('notification')}
          icon="notification"
          design="primary"
        />]

    return (
    <div>
      <NavigationBar
        items={[{
          id: 'browser',
          label: 'Browser',
          isSelected: this.state.selectedId === 'browser',
          onClick: (id) => window.alert(id)
        },{
          id: 'diagnose',
          label: 'Diagnose',
          isSelected: this.state.selectedId === 'diagnose',
          onClick: (id) => window.alert(id)
        },{
          id: 'action',
          label: 'Action',
          isSelected: this.state.selectedId === 'action',
          onClick: (id) => window.alert(id)
        },{
          id: 'deviceTypes',
          label: 'Device Types',
          isSelected: this.state.selectedId === 'deviceTypes',
          onClick: (id) => window.alert(id)
        }]}
        onClick={this.onToggle}
        customContent={arr}
        isFixed
      />
    </div>
    )
  }
}

export default App;
