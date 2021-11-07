import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLVexvewnYSfo032mydBULzdNSfEYisQg",
    authDomain: "fist-project-c01d8.firebaseapp.com",
    databaseURL: "https://fist-project-c01d8.firebaseio.com",
    projectId: "fist-project-c01d8",
    storageBucket: "fist-project-c01d8.appspot.com",
    messagingSenderId: "332027300571",
    appId: "1:332027300571:web:0d7bff165f713374e4dafe",
    measurementId: "G-T9FFRH3KH0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
    // auth.useEmulator('http://localhost:9099');
    // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;