import React from 'react';
import Toolbar from './components/Toolbar.jsx'
import MessageList from './components/MessageList.jsx'
import ComposeForm from './components/ComposeForm.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      messages: [],
      displayCompose: false,
      newMessageBody: '',
      newMessageSubject: ''
    }

    this.composeButton = this.composeButton.bind(this)
    this.submitComposeForm = this.submitComposeForm.bind(this)
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

  reloadMessages = async () => {
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

  composeButton = () => {
    this.setState({
      displayCompose: !this.state.displayCompose
    })
  }

  postNewMessage = async (newMessage) => {
    // POST http://localhost:8082/api/messages
    console.log(JSON.stringify(newMessage))
    let url = `http://localhost:8082/api/messages`
    let res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json"
      }
    }).then( () => {
        this.reloadMessages()
    })

  }

  submitComposeForm = (e) => {
    e.preventDefault()
    let tempSubject = this.state.newMessageSubject
    let tempBody = this.state.newMessageBody
    let newMessage = {
      subject: tempSubject,
      body: tempBody
    }
    this.setState({
      displayCompose: false
    })

    this.postNewMessage(newMessage)
  }

  newMessageSubject = (value) => {
    this.setState({
      newMessageSubject: value
    })
  }

  newMessageBody = (value) => {
    this.setState({
      newMessageBody: value
    })
  }

  selectedHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          selected: message.id === id ? !message.selected : message.selected
        }
      })
    })
  }

  starHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          starred: message.id === id ? !message.starred : message.starred
        }
      })
    })
  }

  readHandler = async (id) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          read: message.id === id ? true : message.read
        }
      })
    })
  }

  markAsRead = async () => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          read: message.selected ? true : message.read
        }
      })
    })
  }

  markAsUnread = async () => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          read: message.selected ? false : message.read
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
        return {
          ...message,
          labels: message.selected && !message.labels.includes(value) ? [...message.labels, value] : message.labels
        }
      })
    })
  }

  removeLabel = async (value) => {
    this.setState({
      messages: this.state.messages.map(message => {
        return {
          ...message,
          labels: message.selected && message.labels.includes(value) ? message.labels.filter(label => label !== value) : message.labels
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
        composeButton={this.composeButton}
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
      <ComposeForm
        displayCompose={this.state.displayCompose}
        submitComposeForm={this.submitComposeForm}
        newMessageBody={this.newMessageBody}
        newMessageSubject={this.newMessageSubject}
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
