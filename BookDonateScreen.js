import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import MyHeader from '../components/MyHeader';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBooksList:[],
        }
        this.requestRef=null
    }
    getRequestedBooksLists=()=>{
        this.requestRef=db.collection("requested_books").onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data())
            this.setState({requestedBooksList:requestedBooksList})
        })
    }
    componentDidMount=()=>{
        this.getRequestedBooksLists();
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
       return( 
       <ListItem key={i}
       title={item.book_Name}
       subtitle={item.reason_To_Request}
       titleStyle={{color:"black", fontWeight:"bold"}}
       rightElement={
           <TouchableOpacity style={styles.button}>
             <Text style={{color:"yellow"}}>View</Text>
           </TouchableOpacity>
       }
       bottomDivider/>
       )
    }
    render(){
        return(
            <View style={{flex:1}}>
               <MyHeader title="Donate Books"/>
               <View style={{flex:1}}>
                   {this.state.requestedBooksList.length===0}?(
                       <View style={styles.subContainer}>
                           <Text style={{fontSize:20}}>No Books Requested</Text>
                       </View>
                   ):
                   (
                       <FlatList keyExtractor={this.keyExtractor}
                       data={this.state.requestedBooksList}
                       renderItem={this.renderItem}/>
                   )
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
 subContainer:{
     flex:1,
     fontSize:20,
     justifyContent:"center",
     alignItems:"center"
 },
 button:{
    justifyContent:"center",
    alignItems:"center",
    width:100,
    height:30,
    backgroundColor:"green"
 }
})