import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyC5RCdECmgN7PnX9cMGtQ7P71o04SG3980",
  authDomain: "tara-white-ink.firebaseapp.com",
  databaseURL: "https://tara-white-ink.firebaseio.com",
  projectId: "tara-white-ink",
  storageBucket: "tara-white-ink.appspot.com",
  messagingSenderId: "266133778755",
  appId: "1:266133778755:web:e024e25432a4b41e343ff6",
  measurementId: "G-MP2FL4NHMP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp, auth };
