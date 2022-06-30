import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCxTK-wk2cJyBiteAueDM0tslUdc7RXtk",
  authDomain: "lizzyshop-b6a0e.firebaseapp.com",
  projectId: "lizzyshop-b6a0e",
  storageBucket: "lizzyshop-b6a0e.appspot.com",
  messagingSenderId: "600977602108",
  appId: "1:600977602108:web:c5e425071423fd81daf539",
  measurementId: "G-DTTWDQ5KGY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };