import React from 'react';
import { StyleSheet,Text,View,SafeAreaView,Platform,StatusBar} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            faces:[]

        }
    }
    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }
    onCameraPermission=(status)=>{
        this.setState({
            hasCameraPermission:status.status==='granted'
        })
    }
    onFacesDetected=(faces)=>{
        this.setState({
            faces:faces
        })
    }
    onFacesDetectionError=(error)=>{
        console.log("error")
    }
    render(){
        const {hasCameraPermission}=this.state
        if (hasCameraPermission==null){
            return <View/>
        }
        if (hasCameraPermission==false) {
            return(
                <View style={styles.container}>
                    <Text>No Access To The Camera</Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}></SafeAreaView>

               <View style={styles.headingContainer}>
                <Text style={styles.titleText}>frapp</Text>
                </View> 
                <View style={styles.cameraStyle}>
                <Camera style={{ flex: 1 }} 
                type={Camera.Constants.Type.front} 
                faceDetectorSettings={{ 
                    mode: FaceDetector.Constants.Mode.fast, 
                    detectLandmarks: FaceDetector.Constants.Landmarks.all, 
                    runClassifications: FaceDetector.Constants.Classifications.all }} 
                    onFacesDetected={this.onFacesDetected} 
                onFacesDetectionError={this.onFacesDetectionError} />
                </View>
                <View></View>
                <View></View>

    </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    headingContainer:{
        flex:0.1,
        alignItems:"center",
        justifyContent:"center",
    },
    titleText:{
        fontSize:30,
    },
    cameraStyle:{
        flex:0.65
    }
  });
  