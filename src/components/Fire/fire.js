/* This file is used to setup the connection to our firebase and be able
   to use and reference it anywhere in our program.
*/

import firebase from 'firebase';

/*
   The following are three databases we used throughout the project
   The database on top is used for submission. The one below was used for testing.
   The third one was used for development. We had to keep moving due to hitting the
   10GB datacap on the total bandwidth that Firebase has for free accounts.
*/

// Submission DB reference because we want to make sure the limit isn't hit (LIMIT EMPTY; DATABASE OPEN)
var config = {
    apiKey: "AIzaSyA2yeckyonhkr_AuR4PrPTUEGPoRyrx36Q",
    authDomain: "fast-release.firebaseapp.com",
    databaseURL: "https://fast-release.firebaseio.com",
    projectId: "fast-release",
    storageBucket: "fast-release.appspot.com",
    messagingSenderId: "538016517850"
  };

const fire = firebase.initializeApp(config);
// Export the database as "fire"
export default fire;

// These are the previous databases we used.

// Testing DB reference because we almost hit the limit for the last one (LIMIT APPROACHING; DATABASE USABLE)
/*
var config = {
    apiKey: "AIzaSyAWQIHQswUxj1U3G_K_ZrctVNEURVw88V0",
    authDomain: "fast-v2-82035.firebaseapp.com",
    databaseURL: "https://fast-v2-82035.firebaseio.com",
    projectId: "fast-v2-82035",
    storageBucket: "fast-v2-82035.appspot.com",
    messagingSenderId: "909068737826"
  };*/

// Development DB reference in case new one breaks functionality (LIMIT HIT; DATABASE FROZEN)
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
