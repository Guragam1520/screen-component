import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , Modal, KeyboardAvoidingView, ScrollView} from 'react-native';
import db from '../config.js';
import firebase from 'firebase';
import SantaClause from '../components/SantaClause';


export default class WelocomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailID:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:"false",
        }
    }
    userSignUp=(emailID,password, confirmPassword)=>{
        if(password!==confirmPassword){
            return alert("Password does not match. Check your password")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailID,password)
        .then(()=>{
         db.collection("users").add({
             first_name:this.state.firstName,
             last_name:this.state.lastName,
             address:this.state.address,
             contact:this.state.contact,
             email_Id:this.state.emailId,
         })

           return alert("User added succesfully",
           '',
           [{
               text:"Ok",onPress:()=>this.setState({'isModalVisible':false})
           }]
           )
           console.log("User added succesfully")
        })
        .catch(function(error){
            var errorcode=error.code;
            var errormessage=error.message;
            return alert(errormessage)
            console.log(errormessage);
        })
    }
    }
    userLogIn=(emailID,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then((response)=>{
           this.props.navigation.navigate("DonateBooks")
           console.log("Succesfully log in")
        })
        .catch(function(error){
            var errorcode=error.code;
            var errormessage=error.message;
            return Alert.alert(errormessage)
            console.log(errormessage);
        })
    }
    showModal=()=>{
        return(
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
             <View style={styles.modalContainer}>
                <ScrollView style={{width:"100%"}}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                      <Text style={styles.modaltitle}>Registration</Text>
                        <TextInput style={styles.formtextInput} 
                          placeholder={"first name"} 
                          maxLength={8}
                          onChangeText={(text)=>{
                              this.setState({firstName:text})
                          }}/>
                        <TextInput style={styles.formtextInput} 
                          placeholder={"last name"} 
                          maxLength={8}
                          onChangeText={(text)=>{
                              this.setState({lastName:text})
                          }}/>
                        
                        <TextInput style={styles.formtextInput} 
                          placeholder={"contact"} 
                          maxLength={10}
                          keyboardType={"numeric"}
                          onChangeText={(text)=>{
                              this.setState({contact:text})
                          }}/>
                        
                        <TextInput style={styles.formtextInput} 
                          placeholder={"address"} 
                          multiline={true}
                          onChangeText={(text)=>{
                              this.setState({address:text})
                          }}/>

                        <TextInput style={styles.formtextInput} 
                          placeholder={"emailId"} 
                          keyboardType={"email-address"}
                          onChangeText={(text)=>{
                              this.setState({emailId:text})
                          }}/>
                        <TextInput style={styles.formtextInput} 
                          placeholder={"password"} 
                          secureTextEntry={true}
                          onChangeText={(text)=>{
                              this.setState({password:text})
                          }}/>
                        <TextInput style={styles.formtextInput} 
                          placeholder={"confirm password"} 
                          secureTextEntry={true}
                          onChangeText={(text)=>{
                              this.setState({confirmPassword:text})
                          }}/>
                        <View style={styles.modalbackbutton}>
                            <TouchableOpacity style={styles.registerbutton} onPress={()=>{
                                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }}>
                              <Text style={styles.registerbuttontext}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalbackbutton}>
                            <TouchableOpacity style={styles.cancelbutton} onPress={()=>{
                             this.setState({'isModalVisible':false})
                                }}>
                              <Text style={styles.cancelbuttontext}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
             </View>
            </Modal>
        )
    }
    render(){
        return(
            
       <View style={styles.container}>
           <View style={{justifyContent:"center", alignItems:"center"}}>
               {this.showModal()}
           </View>
           <View style={styles.profileContainer}>
   
               <Text style={styles.title}>Book Santa</Text>
           </View>
           <View style={styles.buttonContainer}>
               <TextInput style={styles.loginBox}
               placeholder="abc@example.com"
               keyboardType="email-address"
               onChangeText={(text)=>{
                   this.setState({emailID:text})
               }} />
                <TextInput style={styles.loginBox}
               placeholder="enter password"
                secureTextEntry={true}
               onChangeText={(text)=>{
                   this.setState({password:text})
               }} />
               <TouchableOpacity style={styles.button} onPress={()=>{
                   this.userLogIn(this.state.emailID, this.state.password);
               }}>
                   <Text style={styles.buttonText}>Log In</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button} onPress={()=>{
                  this.setState({isModalVisible:true})
               }}>
                   <Text style={styles.buttonText}>Sign Up</Text>
               </TouchableOpacity>
           </View>
       </View>
        );
    }
}
const styles=StyleSheet.create({
 loginBox:{
     width:300,
     height:40,
     borderWidth:2,
     backgroundColor:"yellow",
     margin:10,
     paddingLeft:10,
     fontSize:20
 },
 title:{
     fontSize:65,
     fontWeight:"bold",
     paddingBottom:30,
     color:"blue"
 },
 container:{
     flex:1,
     backgroundColor:"grey"
 },
 buttonContainer:{
     flex:1,
     alignItems:"center"
 },
 profileContainer:{
     flex:1,
     justifyContent:"center",
     alignItems:"center"
 },
 button:{
     width:300,
     height:50,
     justifyContent:"center",
     borderRadius:25,
     backgroundColor:"red",
     padding:5,
     marginTop:12,
     alignItems:"center"
 },
 buttonText:{
     color:"cyan",
     fontWeight:"bold",
     fontSize:20
 },
 modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:"center",
     alignItems:"center",
     marginRight:30,
     marginLeft:30,
     marginTop:80,
     marginBottom:80,
 },
 keyboardAvoidingView:{
     flex:1,
     justifyContent:"center",
     alignItems:"center"
 },
 modaltitle:{
     justifyContent:"center",
     alignSelf:"center",
     fontSize:30,
     margin:30
 },
 formtextInput:{
     width:"75%",
     height:35,
     alignSelf:"center",
     borderRadius:10,
     borderWidth:3,
     marginTop:20,
     padding:10,
     backgroundColor:"yellow"
 },
 modalbackbutton:{
     flex:1,
     justifyContent:"center",
     alignItems:"center"
 },
 registerbutton:{
     width:200,
     height:40,
     alignItems:"center",
     justifyContent:"center",
     borderWidth:3,
     borderRadius:10,
     marginTop:30
 },
 registerbuttontext:{
     fontSize:15,
     fontWeight:"bold",
     color:"red"
 },
 cancelbutton:{
    width:200,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:3,
    borderRadius:10,
    marginTop:30
 },
 cancelbuttontext:{
    fontSize:15,
    fontWeight:"bold",
    color:"red"
 }
})