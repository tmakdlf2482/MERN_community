import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd_QE7txmn30JPJ8jXwwUvwk3I-9Yq6cA",
  authDomain: "react-community-829d0.firebaseapp.com",
  projectId: "react-community-829d0",
  storageBucket: "react-community-829d0.appspot.com",
  messagingSenderId: "859016357479",
  appId: "1:859016357479:web:40b9a3e3406d6c9c4e56c2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;