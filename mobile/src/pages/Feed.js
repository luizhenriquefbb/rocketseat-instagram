import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import camera from "../../assets/assets/camera.png";

const styles = StyleSheet.create({
  headerCamera: {
    marginHorizontal:20,
  },
});

export default class Feed extends Component {
    static testAlert = () => {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    static navigate = (navigationObj, route) => {
        navigationObj.navigate(route);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight : (
            <TouchableOpacity onPress={() => {this.navigate(navigation, "New")}}>
                <Image style={styles.headerCamera} source={camera} />
            </TouchableOpacity>
        )
    });


    render() {
        return (
            <View>
            </View>
            );
    }
}