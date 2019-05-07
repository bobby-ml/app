import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

var config = {
    apiKey: "AIzaSyD2f6NCYFam3tVKQVBzNh5uW7_0A4OCFoo",
    authDomain: "cooperathon.firebaseapp.com",
    databaseURL: "https://cooperathon.firebaseio.com",
    projectId: "cooperathon",
    storageBucket: "cooperathon.appspot.com",
    messagingSenderId: "952588883831"
  };

  app.initializeApp(config);





  export default app
  