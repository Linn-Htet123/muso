import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDNU3YXgEqRucUl0l4vnVm1joV_QqRxQZ8",
    authDomain: "linn-muso.firebaseapp.com",
    projectId: "linn-muso",
    storageBucket: "linn-muso.appspot.com",
    messagingSenderId: "244822581330",
    appId: "1:244822581330:web:049dc8eac9ffa897e43f8b",
};
//init firebase service
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const projectGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
//time stamp

const timeStamp  = firebase.firestore.FieldValue.serverTimestamp

export  {projectAuth,projectFirestore,projectStorage,timeStamp, projectGoogleAuthProvider}