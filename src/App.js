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

    this.markAsRead = this.markAsRead.bind(this)
    this.markAsUnead = this.markAsUnread.bind(this)
    this.selectedHandler = this.selectedHandler.bind(this)
    this.readHandler = this.readHandler.bind(this)
    this.starHandler = this.starHandler.bind(this)
    this.markAsChecked = this.markAsChecked.bind(this)
    this.anyChecked = this.anyChecked.bind(this)
    this.noneChecked = this.noneChecked.bind(this)
    this.unreadCount = this.unreadCount.bind(this)
    this.applyLabel = this.applyLabel.bind(this)
    this.removeLabel = this.removeLabel.bind(this)
    this.deleteMessages = this.deleteMessages.bind(this)
  }

  componentDidMount = async() => {
    let url = `http://localhost:8082/api/messages`
    let res = await fetch(url)
    let messagesJson = await res.json()

    this.setState({
      messages: messagesJson.map( (message, index) => {
        return {
          ...message,
          selected: message.selected || false,
          id: index
        }
      })
    })
  }

  selectedHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.id === id){
          return {
            ...message,
            selected: !message.selected
          }
        } else {
          return {
            ...message
          }
        }
      })
    })

    this.anyChecked()
  }

  starHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.id === id){
          return {
            ...message,
            starred: !message.starred
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  readHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.id === id){
          return {
            ...message,
            read: true
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  markAsRead = async () => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.selected){
          return {
            ...message,
            read: true
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  markAsUnread = async () => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.selected){
          return {
            ...message,
            read: false
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  markAsChecked = async () => {
    if(this.anyChecked()){
      this.setState({
        messages: this.state.messages.map(message => {
          return {
            ...message,
            selected: true
          }
        })
      })
    } else {
      this.setState({
        messages: this.state.messages.map(message => {
          return {
            ...message,
            selected: false
          }
        })
      })
    }
  }

  applyLabel = async (value) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.selected && !message.labels.includes(value)){
          return {
            ...message,
            labels: [...message.labels, value]
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  removeLabel = async (value) => {
    this.setState({
      messages: this.state.messages.map(message => {
        if(message.selected && message.labels.includes(value)){
          return {
            ...message,
            labels: message.labels.filter(label => label != value)
          }
        } else {
          return {
            ...message
          }
        }
      })
    })
  }

  deleteMessages = async () => {
    this.setState({
      messages: this.state.messages.filter(message => !message.selected)
    })
  }

  anyChecked = () => {
    let localMessages = this.state.messages
    for(let i = 0; i < localMessages.length; i++){
      if( !localMessages[i].selected ){
        return true
      }
    }
    return false
  }

  noneChecked = () => {
    let localMessages = this.state.messages
    for(let i = 0; i < localMessages.length; i++){
      if( localMessages[i].selected ){
        return false
      }
    }
    return true
  }

  unreadCount = () => {
    let count = 0
    let localMessages = this.state.messages
    for(let i = 0; i < localMessages.length; i++){
      if( !localMessages[i].read ){
        count++
      }
    }
    return count
  }

  render(){
    console.log(this.state)
    return (
      <>
      <Toolbar
        anyChecked={this.anyChecked}
        noneChecked={this.noneChecked}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
        markAsChecked={this.markAsChecked}
        unreadCount={this.unreadCount}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}
        deleteMessages={this.deleteMessages}
      />
      <MessageList
        messagesList={this.state.messages}
        selectedHandler={this.selectedHandler}
        readHandler={this.readHandler}
        starHandler={this.starHandler}

      />
    </>
  )
}


}

export default App;
