import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  YellowBox,
  Button
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import TaskBox from "../components/taskBox";
import * as firebase from "firebase";
import "firebase/firestore";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default class homepage extends React.Component {
  constructor(props) {
    super(props);
    let year = (new Date().getFullYear()).toString()
    let month = (new Date().getMonth()+1).toString()
    let days = (new Date().getDate()).toString()

    if (month.length < 2){
      month = '0'+month
    }
    if (days.length < 2){
      days = '0'+days
    }
    this.state = {
      curTime: moment().format("hh:mm A"),
      date: year+month+days,
      taskDone: [],
      shouldUpdate: true
    };
    this.renderDataTodayFromDatabase = this.renderTodayDataFromDatabase.bind(this)
  }

  renderTodayDataFromDatabase(){
    let count = 0;
    this.setState({taskDone: [], yesterdayTask: false})
    console.log(this.state.date);
    firebase
      .firestore()
      .collection("task")
      .doc(this.props.navigation.state.params.uid)
      .collection("days")
      .doc(this.state.date)
      .collection("data")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.setState((prevState) => ({
            taskDone: [
              ...prevState.taskDone,
              <TouchableOpacity key={count++} style={styles.task}>
                <Text style={styles.taskTextBig}>{doc.data().title}</Text>
                <View style={styles.insideTask}>
                  <Text style={styles.taskTextSmall}>
                    From {doc.data().startTime} to {doc.data().endTime}
                  </Text>
                  <Text style={styles.taskTextSmall}>
                    {doc.data().timeTaken}
                  </Text>
                </View>
              </TouchableOpacity>
            ],
          }));
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }

  addNewData(){
    let count = this.state.taskDone.length;
    // this.setState({taskDone: []})
    console.log(this.state.date);
    firebase
      .firestore()
      .collection("task")
      .doc("112372675671413980400")
      .collection("days")
      .doc(this.state.date)
      .collection("data")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.setState((prevState) => ({
            taskDone: [
              ...prevState.taskDone,
              <TouchableOpacity key={count++} style={styles.task}>
                <Text style={styles.taskTextBig}>{doc.data().title}</Text>
                <View style={styles.insideTask}>
                  <Text style={styles.taskTextSmall}>
                    From {doc.data().startTime} to {doc.data().endTime}
                  </Text>
                  <Text style={styles.taskTextSmall}>
                    {doc.data().timeTaken}
                  </Text>
                </View>
              </TouchableOpacity>
            ],
          }));
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (this.props.navigation.state.params.added) {
        this.addNewData();
        this.props.navigation.state.params.added = false
      } 
      else if (this.state.shouldUpdate){
        this.renderTodayDataFromDatabase()
        this.setState({
          shouldUpdate: false
        })
      }
      else{
    
      }
    })
    this.interval = setInterval(() => {
      const currentDate = moment().format("hh:mm A");
      this.setState({ curTime: currentDate });
    }, 1000);
  }

  componentWillUnmount(){
    this.focusListener.remove()
    clearInterval(this.interval);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.upperText}>Current Time is</Text>
          <Text style={styles.timeText}>{this.state.curTime}</Text>
        </View>
        <View style={styles.middleContainer}>
          <TouchableOpacity style={styles.todayBtn} activeOpacity={0.5} onPress={this.renderTodayDataFromDatabase.bind(this)}>
            <Text style={{ color: "#fff", fontSize: 15 }}>Today's tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.prevBtn}
            activeOpacity={0.5}
            // onPress={this.renderYesterdayDataFromDatabase.bind(this)}
            onPress = {() => navigate("prevDay")}
          >
            <Text style={{ color: "#66AD72", fontSize: 15 }}>
              Other days
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>{this.state.taskDone}</ScrollView>
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.relative}
            onPress={() => {
              navigate("addNewTask", {
                uid: this.props.navigation.state.params.uid,
                taskDone: this.state.taskDone
              });
            }}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    height: "35%",
    backgroundColor: "#66AD72",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  upperText: {
    fontSize: 30,
    color: "#fff",
  },
  timeText: {
    fontSize: 60,
    color: "#fff",
  },
  middleContainer: {
    height: "12%",
    padding: 30,
    // backgroundColor: 'green',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todayBtn: {
    backgroundColor: "#66AD72",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
  },
  prevBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#66AD72",
  },
  add: {
    position: "absolute",
    bottom: "2%",
    left: "75%",
    borderWidth: 1,
    borderRadius: 70,
    padding: "3%",
    paddingHorizontal: "6.5%",
    borderColor: "#66AD72",
    backgroundColor: "#fff",
    // backgroundColor: 'red'
  },
  relative: {
    position: "relative",
    top: "15%",
    left: "33%",
  },
  addText: {
    fontSize: 38,
    color: "#66AD72",
  },
  task: {
    marginVertical: "3%",
    marginHorizontal: "5%",
    padding: "3%",
    paddingBottom: "1%",
    borderWidth: 1,
    borderColor: "#66AD72",
    borderRadius: 8,
  },
  taskTextBig: {
    fontSize: 20,
    fontWeight: "bold",
  },
  insideTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "3%",
  },
});
