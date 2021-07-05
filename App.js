import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class App extends Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      buttonState:"normal",
      scannedData:""
          }
  }
getCameraPermissions=async()=>{
  const {status}=await Permissions.askAsync(Permissions.CAMERA)
  this.setState({
    hasCameraPermissions:status==="granted",
    buttonState:"clicked",
    scanned:false
  })
}
handleBarCodeScan=async({type,data})=>{
  this.setState({
    scanned:true,
    scannedData:data,
    buttonState:"normal"
  })
}
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const buttonState=this.state.buttonState
      if (buttonState==="clicked"&& hasCameraPermissions){
      
      return (
       <BarCodeScanner style={StyleSheet.absoluteFillObject}onBarCodeScanned={scanned ? undefined:this.handleBarCodeScan}></BarCodeScanner>
      )
      }
      else if(buttonState==="normal"){
        return(
          <View style={styles.container}>
            <Text style={styles.displayText}>
         { this.state.scannedData}
            </Text>
            <TouchableOpacity style={styles.scanButton}onPress={()=>{
              this.setState({
                hasCameraPermissions:true,
                buttonState:"clicked",
                scanned:false
              })
            }}>
              <Text style={styles.buttonText}>Scan QR code</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });

