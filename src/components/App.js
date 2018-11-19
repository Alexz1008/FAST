import React, { Component } from 'react';
import './App.css';
import Main from './Main/main';

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
      </div>
    );
  }
}

export default App;
