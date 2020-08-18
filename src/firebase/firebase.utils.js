import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB5izVDy0jSfMwzXrfZ3ZdGtn90idm6yqM",
  authDomain: "crown-db-257b7.firebaseapp.com",
  databaseURL: "https://crown-db-257b7.firebaseio.com",
  projectId: "crown-db-257b7",
  storageBucket: "crown-db-257b7.appspot.com",
  messagingSenderId: "342844975360",
  appId: "1:342844975360:web:672140950ee06c9f83abe5",
  measurementId: "G-9KKBNFJF59"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
