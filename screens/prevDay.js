import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

class prevDay extends Component {
  constructor(props){
    super(props)
    this.state = {
      date:year+month+days,
      taskDone: []
    }
    let year = (new Date().getFullYear()).toString()
    let month = (new Date().getMonth()+1).toString()
    let days = (new Date().getDate()).toString()

    if (month.length < 2){
      month = '0'+month
    }
    if (days.length < 2){
      days = '0'+days
    }
    
  }

  componentDidMount(){
    let count = 0;
    firebase
      .firestore()
      .collection("task")
      .doc("112372675671413980400")
      .collection("days")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data().date)
          let date = doc.data().date
          let dateLength = doc.length
          date = date.slice(0, 4) + "/" + date.slice(4, 6) + "/" +date.slice(6);
          this.setState((prevState) => ({
            taskDone: [
              ...prevState.taskDone,
              <TouchableOpacity key={count++} style={styles.task}>
                <Text style={styles.title}>{date}</Text>
              </TouchableOpacity>
            ],
          }));
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }

  render() {
    return (
      <ScrollView>
        {this.state.taskDone}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  task:{
    marginVertical: "2%",
    marginHorizontal: "2%",
    padding: "3%",
    borderWidth: 1,
    borderColor: "#66AD72",
    // borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
});

export default prevDay;
