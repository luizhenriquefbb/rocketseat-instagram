import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Feed from "./pages/Feed";
import New from "./pages/New";
import { Image, StyleSheet } from "react-native";
import logo  from "../assets/assets/logo.png";

const styles = StyleSheet.create({
  headerTitle: {
    marginHorizontal:20,
  },
});

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions : {
            headerTitle : <Image style={styles.headerTitle} source={logo} />,
            headerTintColor : '#000', // cor do botao voltar
            headerBackTitle : null,

        },
        mode : 'modal',

    })
);



