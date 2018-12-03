/* This file is used to setup the connection to our firebase and be able
   to use and reference it anywhere in our program.
*/

import firebase from 'firebase';

// New DB reference because we almost hit the limit for the last one
var config = {
    apiKey: "AIzaSyAWQIHQswUxj1U3G_K_ZrctVNEURVw88V0",
    authDomain: "fast-v2-82035.firebaseapp.com",
    databaseURL: "https://fast-v2-82035.firebaseio.com",
    projectId: "fast-v2-82035",
    storageBucket: "fast-v2-82035.appspot.com",
    messagingSenderId: "909068737826"
  };

// Old DB reference in case new one breaks more stuff
/*
var config = {
  apiKey: "AIzaSyAMVKcugugokMLjDfp4N8KVqsEpvnzcqwU",
  authDomain: "fast-8cfa5.firebaseapp.com",
  databaseURL: "https://fast-8cfa5.firebaseio.com",
  projectId: "fast-8cfa5",
  storageBucket: "fast-8cfa5.appspot.com",
  messagingSenderId: "413458791050"
};
*/
const fire = firebase.initializeApp(config);
// Export the database as "fire"
export default fire;
