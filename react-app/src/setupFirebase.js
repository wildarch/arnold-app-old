import * as firebase from 'firebase';

export default function setupFirebase() {
  const config = {
    apiKey: "AIzaSyCPzEuR-tNHrEuAXfM-nPFXPl-cOVv9x0U",
    authDomain: "arnoldapp-beb09.firebaseapp.com",
    databaseURL: "https://arnoldapp-beb09.firebaseio.com",
    projectId: "arnoldapp-beb09",
    storageBucket: "arnoldapp-beb09.appspot.com",
    messagingSenderId: "360543261866"
  };
  firebase.initializeApp(config);
}
