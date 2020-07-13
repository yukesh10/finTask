import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as firebase from 'firebase'
import 'firebase/firestore'
import moment from "moment";

class addNewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      title: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      date: null,
      startTime: null,
      endTime: null,
      taskDone: []
    };
    // this.setState({taskDone: props.taskDone})
  }

  componentDidMount(){
    let year = (new Date().getFullYear()).toString()
    let month = (new Date().getMonth()+1).toString()
    let days = (new Date().getDate()).toString()

    if (month.length < 2){
      month = '0'+month
    }
    if (days.length < 2){
      days = '0'+days
    }
      this.setState({
          date: year+month+days
      })
      setInterval(()=>{
        const currentDate = moment().format('hh:mm A');
        this.setState({curTime: currentDate})
      }, 1000)
  }

  twoOrMoreDigits = (time, type) => {
      if (time < 10){
        return '0'+time
      }
      else{
          if (type == 'seconds' && time == 60){
              if (this.state.minutes < 59){
                this.setState({seconds: 0, minutes: this.state.minutes+1})
              }
              else{
                this.setState({seconds: 0, minutes: 0, hours: this.state.hours+1})
              }
          }
          return time
      }
  }

  startTimer = () => {
    this.setState({started: true, startTime: this.state.curTime})
      this.interval = setInterval(()=>{
          this.setState(prevState => ({
            seconds: prevState.seconds + 1
          }))
      }, 1000)
  }

  cancelTimer = () => {
    clearInterval(this.interval)
    this.setState({started: false, hours: 0, minutes: 0, seconds: 0, startTime: null})
  }

  stopTimer = () => {
    firebase.firestore().collection('task').doc(this.props.navigation.state.params.uid).collection("days").doc(this.state.date).set({date: this.state.date})
    
    firebase.firestore().collection('task').doc(this.props.navigation.state.params.uid).collection("days").doc(this.state.date).collection("data").add({
        title: this.state.title,
        timeTaken: this.twoOrMoreDigits(this.state.hours)+":"+this.twoOrMoreDigits(this.state.minutes)+":"+this.twoOrMoreDigits(this.state.seconds, 'seconds'),
        startTime: this.state.startTime,
        endTime: this.state.curTime,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    this.props.navigation.navigate("home", {added: true})
  }

  render() {
    let button;
    if (this.state.started === true) {
      button = (
        <View style={styles.startedStateStructure}>
          <View style={styles.otherButton}>
            <Text style={styles.otherButtonText} onPress={()=>this.stopTimer()}>STOP</Text>
          </View>
          <View style={styles.otherButton}>
            <Text style={styles.otherButtonText} onPress={()=>this.cancelTimer()}>CANCEL</Text>
          </View>
        </View>
      );
    } else {
      button = (
        <View style={styles.startStopButton}>
          <Text style={styles.startStopButtonText} onPress={()=>{this.startTimer()}}>START</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What are you doing right now?"
          placeholderTextColor="#66AD72"
          style={styles.taskInput}
          onChangeText={text=>this.setState({title: text})}
        />
        <View style={styles.time}>
          <Text style={styles.timer}>{this.twoOrMoreDigits(this.state.hours, 'hours')}
            <Text style={styles.timerType}>H</Text> {this.twoOrMoreDigits(this.state.minutes, 'minutes')}
            <Text style={styles.timerType}>M</Text> {this.twoOrMoreDigits(this.state.seconds, 'seconds')}
            <Text style={styles.timerType}>S</Text>
          </Text>
        </View>
        {button}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66AD72",
  },
  taskInput: {
    backgroundColor: "#fff",
    marginHorizontal: "10%",
    marginTop: "70%",
    padding: 15,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#66AD72",
  },
  time: {
    marginTop: "2%",
    alignItems: "center",
    marginHorizontal: "10%",
  },
  timer: {
    color: "#fff",
    fontSize: 65,
  },
  timerType: {
    fontSize: 20,
  },
  startStopButtonText: {
    color: "#66AD72",
    fontWeight: "bold",
    fontSize: 20
  },
  startStopButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: "35%",
    width: "30%",
    padding: "6%",
    borderColor: "#66AD72",
    marginTop: "15%",
    marginBottom: '10%'
  },
  startedStateStructure: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  otherButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    width: '30%',
    marginTop: '30%',
    padding: '6%',
    // paddingTop: '6%',
    borderColor: '#66AD72' 
  },
  otherButtonText: {
      textAlign: 'center',
      color: '#66AD72',
      fontWeight: 'bold',
      fontSize: 15,
  }
});

export default addNewTask;
