// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC7GQQvfEwtVhemxt6Lv5s6uDacoaav7j8",
      authDomain: "fintask.firebaseapp.com",
      databaseURL: "https://fintask.firebaseio.com",
      projectId: "fintask",
      storageBucket: "fintask.appspot.com",
      messagingSenderId: "714345785793",
      appId: "1:714345785793:web:5543eccca309bf198f2740",
      measurementId: "G-NS7HTR5NKL"
  };
  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  //   firebase.analytics();