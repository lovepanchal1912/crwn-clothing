import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDXTDyzkgtwvdhNVcYgPN2b6rfyd9jcDVM",
  authDomain: "react-crwn-clothing-22ab8.firebaseapp.com",
  projectId: "react-crwn-clothing-22ab8",
  storageBucket: "react-crwn-clothing-22ab8.appspot.com",
  messagingSenderId: "759320356190",
  appId: "1:759320356190:web:68b888094e201e92569bcf",
};

firebase.initializeApp(config);

export const createUserProfileDoc = async (userAuth, additionData) => {
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
        ...additionData,
      });
    } catch (error) {
      console.log("Error at storing Data ", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;