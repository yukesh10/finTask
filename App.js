import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';

import HomePage from './screens/homepage'
import SplashScreen from './screens/splashScreen'
import PrevDay from './screens/prevDay'
import AddNewTask from './screens/addNewTask'

import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }

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

const MainNavigator = createStackNavigator({
  splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  home:{
    screen: HomePage,
    navigationOptions:{
      header: null
    }
  },
  prevDay:{
    screen: PrevDay,
    navigationOptions:{
      title: "Other days"
    }
  },
  addNewTask: {
    screen: AddNewTask,
    navigationOptions:{
      title: "Add New Task"
    }
  }
})

const App = createAppContainer(MainNavigator);

export default App;