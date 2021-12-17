import React from 'react';
import { StyleSheet,SafeAreaView, Platform} from 'react-native';
import { StatusBar, Text } from 'react-native';
import Form from './src/components/Form';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Form />
    </SafeAreaView>
  );
  
}


const styles = StyleSheet.create({
  container:{
    height:'100%',
    paddingTop: Platform.OS==='android'? StatusBar.currentHeight:0,
  }
})


