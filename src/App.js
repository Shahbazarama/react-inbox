import React from 'react';
import Toolbar from './components/Toolbar.jsx'
import MessageList from './components/MessageList.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

function App() {
  return (
    <>
    <Toolbar />
    <MessageList />
  </>
  )

}

export default App;
