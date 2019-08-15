import firebase from "firebase";
import "firebase/firestore";
import config from "./firebaseConfig";
const initApp = firebase.initializeApp(config);
export default initApp.firestore();
