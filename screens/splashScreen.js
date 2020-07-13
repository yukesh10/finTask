import React, { Component } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import FacebookButton from "../components/facebookButton";
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'
import 'firebase/firestore'

class splashScreen extends Component {
  signInWithGoogleAsync = async() => {
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "714345785793-851vef524cq00umubqoh0hiedk8g0s31.apps.googleusercontent.com",
          iosClientId:
            "714345785793-4sf2cnkl5u1rnq9d298spqonli8o2ank.apps.googleusercontent.com",
          scopes: ["profile", "email"],
        });
        if (result.type === "success") {
          firebase.firestore().collection('users').doc(result.user.id).set({
            uid: result.user.id,
            name: result.user.name
          }, {merge: true})
          this.props.navigation.navigate("home", {uid: result.user.id});
        } else {
          console.log("cancelled");
        }
      } catch (e) {
        console.log("error: ", e);
      }
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.main}>
          <Image style={styles.logo} source={require("../icons/logo.png")} />
          <Text style={styles.text}>Track Your Daily Activities</Text>
          <View style={styles.gmailBtn}>
            {/* <GmailButton title="LOGIN WITH GMAIL" navigate={navigate} destination="main"/> */}
            <TouchableOpacity
              onPress={this.signInWithGoogleAsync}
              activeOpacity={0.5}
              style={styles.button}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                LOGIN WITH GMAIL</Text>
            </TouchableOpacity>
            <FacebookButton
              title="LOGIN WITH FACEBOOK"
              navigate={navigate}
              destination="main"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#66AD72",
  },
  main: {
    marginTop: "70%",
    alignItems: "center",
  },
  logo: {
    height: 238,
    width: 323,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    marginVertical: 10,
  },
  gmailBtn: {
    marginTop: "20%",
  },
  button: {
    width: 323,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: "#d44638",
  }
});

export default splashScreen;
