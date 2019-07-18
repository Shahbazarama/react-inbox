import React from 'react';
import Toolbar from './components/Toolbar.jsx'
import MessageList from './components/MessageList.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount = async() => {
    let url = `http://localhost:8082/api/messages`
    let res = await fetch(url)
    let messagesJson = await res.json()

    this.setState({
      messages: messagesJson.map(message => {
        return {
          ...message,
          checked: false
        }
      })
    })
  }



  render(){
    return (
      <>
      <Toolbar />
      <MessageList messagesList={this.state.messages}/>
    </>
    )
  }


}

export default App;
