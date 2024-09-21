
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth' 
import 'firebase/firebase'
import 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyB5gk3C9LmTyYs76zBakpzDqbhbks1Q9p8",
  authDomain: "olx-clone-eed52.firebaseapp.com",
  projectId: "olx-clone-eed52",
  storageBucket: "olx-clone-eed52.appspot.com",
  messagingSenderId: "303347323772",
  appId: "1:303347323772:web:ed915eaf5b1809f4378af9"
};


export default firebase.initializeApp(firebaseConfig);


