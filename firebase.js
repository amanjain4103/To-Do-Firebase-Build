// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZFkNVy4wvePPcU-qodguvUdu86E3t_s8",
    authDomain: "todo-live-b24c4.firebaseapp.com",
    projectId: "todo-live-b24c4",
    storageBucket: "todo-live-b24c4.appspot.com",
    messagingSenderId: "832037623273",
    appId: "1:832037623273:web:035e646c1d7ea55d742778",
    measurementId: "G-E9J3VCG3BZ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();