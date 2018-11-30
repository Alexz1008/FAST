/* This file is used to setup the connection to our firebase and be able
   to use and reference it anywhere in our program.
*/

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAMVKcugugokMLjDfp4N8KVqsEpvnzcqwU",
  authDomain: "fast-8cfa5.firebaseapp.com",
  databaseURL: "https://fast-8cfa5.firebaseio.com",
  projectId: "fast-8cfa5",
  storageBucket: "fast-8cfa5.appspot.com",
  messagingSenderId: "413458791050"
};
const fire = firebase.initializeApp(config);
// Export the database as "fire"
export default fire;
