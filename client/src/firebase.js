import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import dev from '../config/dev.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: dev.apiKey,
  authDomain: dev.authDomain,
  projectId: dev.projectId,
  storageBucket: dev.storageBucket,
  messagingSenderId: dev.messagingSenderId,
  appId: dev.appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;