import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const greenButton = (props) =>{
    return(
        <TouchableOpacity
            onPress={this.signInWithGoogleAsync}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>{props.title}</Text>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 323,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        borderRadius: 50,
        marginVertical: 10,
        backgroundColor: "#d44638",
      }
})

export default greenButton;