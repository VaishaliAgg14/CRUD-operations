import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAfPx7Tc6b1jf793OAL_qfTtcln2yZQoG4",
    authDomain: "crud-app-33a14.firebaseapp.com",
    projectId: "crud-app-33a14",
    storageBucket: "crud-app-33a14.appspot.com",
    messagingSenderId: "142729833018",
    appId: "1:142729833018:web:aa47abbc48dcca73866303",
    measurementId: "G-8SEJJXB6GN"
})

export const db = firebaseApp.firestore();

export const auth = firebase.auth();

