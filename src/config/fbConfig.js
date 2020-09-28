import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyD9vt4MpZFQ_EtpuYqpKVfJ4h36ka0HeL0",
	authDomain: "project-planner-23c08.firebaseapp.com",
	databaseURL: "https://project-planner-23c08.firebaseio.com",
	projectId: "project-planner-23c08",
	storageBucket: "project-planner-23c08.appspot.com",
	messagingSenderId: "922789609719",
	appId: "1:922789609719:web:72563a7abf8230894c93f2",
	measurementId: "G-G4HN2EHBBH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
