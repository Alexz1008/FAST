import React, { Component } from 'react';
import './App.css';
import Main from './Main/main';
import firebase from 'firebase';
import Register from './Register/register.js'

class App extends Component {

  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAMVKcugugokMLjDfp4N8KVqsEpvnzcqwU",
      authDomain: "fast-8cfa5.firebaseapp.com",
      databaseURL: "https://fast-8cfa5.firebaseio.com",
      projectId: "fast-8cfa5",
      storageBucket: "fast-8cfa5.appspot.com",
      messagingSenderId: "413458791050"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div>
        <Main />
        <Register db={firebase}/>
      </div>
    );
  }
}

export default App;
