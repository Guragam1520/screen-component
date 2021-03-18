import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert , TouchableOpacity} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config.js';
import firebase from 'firebase';
import { KeyboardAvoidingView } from 'react-native';

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userID:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:''
        }
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7)
    }
    addRequest=(bookName, reasonToRequest)=>{
      var userId=this.state.userId
      var randomRequestId=this.createUniqueId();
      db.collection("requested_books").add({
          "user_Id":userId,
          "book_Name":bookName,
          "reason_To_Request":reasonToRequest,
          "request_Id":randomRequestId
      })
      this.setState({
          bookName:'',
          reasonToRequest:''
      })
      return alert("Book Requested Successfully")
      console.log("Book Requested Successfully")
    }
    render(){
        return(
            <View style={{flex:1}}>
               <MyHeader title="Request Book"/>
               <KeyboardAvoidingView style={styles.keyboardStyle}>
                   <TextInput style={styles.formTextinput}
                   placeholder={"Enter Book Name"}
                   onChangeText={(text)=>{
                       this.setState({bookName:text})
                       
                   }}
                   value={this.state.bookName}
                   />
                     <TextInput style={[styles.formTextinput,{height:300}]}
                   placeholder={"Why do you need the Book ?"}
                   multiline numberOfLines={8}
                   onChangeText={(text)=>{
                       this.setState({reasonToRequest:text})
                       
                   }}
                   value={this.state.reasonToRequest}
                   />
                   <TouchableOpacity style={styles.button} onPress={()=>{this.addRequest(this.state.bookName, this.state.reasonToRequest)}}>
                        <Text>Request</Text>
                   </TouchableOpacity>
                   
                   </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
  button:{
      width:"75%",
      height:15,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10,
      backgroundColor:"green",
      borderWidth:3
  },
  formTextinput:{
    width:"75%",
    height:35,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"yellow",
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  keyboardStyle:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
  }
})
