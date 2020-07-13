import React from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'

const taskBox = (props) => {
    return(
    <TouchableOpacity style={styles.task}>
        <Text style={styles.taskTextBig}>Studing Algorithm Textbook</Text>
        <View style={styles.insideTask}>
          <Text style={styles.taskTextSmall}>From 12:28 pm to 1:00 pm</Text>
          <Text style={styles.taskTextSmall}>00:32</Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    task:{
        marginVertical: '3%',
        marginHorizontal: "5%",
        padding: '3%',
        paddingBottom: '1%',
        borderWidth: 1,
        borderColor: '#66AD72',
        borderRadius: 8,
      },
      taskTextBig:{
        fontSize: 20,
        fontWeight: "bold",
      },
      insideTask:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '3%'
      },
})

export default taskBox;