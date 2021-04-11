import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBtBHT9U7OZ2KkHUJnIxzEVxAGmqy4QwTA",
  authDomain: "whatsapp-nextjs-clone.firebaseapp.com",
  projectId: "whatsapp-nextjs-clone",
  storageBucket: "whatsapp-nextjs-clone.appspot.com",
  messagingSenderId: "321759526115",
  appId: "1:321759526115:web:73e2351276fbb2073759d6",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
