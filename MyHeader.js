import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header} from 'react-native-elements'

const MyHeader=props=>{
    return(
        <Header 
        centerComponent={{text:props.title, style:{color:"red", fontSize:20, fontWeight:"bold"}}}
         backgroundColor="yellow"
        />
    )
}
export default MyHeader;