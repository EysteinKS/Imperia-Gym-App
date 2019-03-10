import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAf-_P3Ipte9mCaps0WNoS_uwlTGN2_X4s",
    authDomain: "gyma-b04dd.firebaseapp.com",
    databaseURL: "https://gyma-b04dd.firebaseio.com",
    projectId: "gyma-b04dd",
    storageBucket: "gyma-b04dd.appspot.com",
    messagingSenderId: "508667455365"
};

console.log(config)

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
    auth,
    firestore,
}