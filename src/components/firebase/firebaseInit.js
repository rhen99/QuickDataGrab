import firebaseApp from "firebase/app";
import "firebase/firestore";
import config from "./firebaseConfig";
const initApp = firebaseApp.initializeApp(config);
export default initApp.firestore();
