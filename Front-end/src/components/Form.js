import React from 'react'
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Input from './Input';
import MD5 from "crypto-js/md5";
import axios from 'axios';
import DatePicker from './DatePicker';

export default function Form() {
  // les variables de chaque fielde
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [birthDay,setBirthDay]=useState(new Date());

  //les variable des erreurs de chaque fielde ('par default est false')
  const [fNameErr, setFNameErr]= useState(false)
  const [lNameErr, setlNameErr]= useState(false)
  const [emailErr, setEmailErr]= useState(false)
  const [passwordErr, setPassErr]= useState(false)
  
  //return true si les champs est valide false si non
  const validate = ()=>{
    const namePattern = /^[a-z]{3,15}$/
    const emailPattern = /^[a-zA-Z][a-zA-Z1-9]{3,}@[a-z]{3,15}\.[a-z]{2,9}$/
    const passPattern = /^[a-zA-Z1-9]{6,25}/
    if(!namePattern.test(firstName) || !namePattern.test(lastName) || !emailPattern.test(email) || !passPattern.test(password)){
      if(!namePattern.test(firstName))
        setFNameErr(true)
      else
        setFNameErr(false)

      if(!namePattern.test(lastName))
       setlNameErr(true)
      else
        setlNameErr(false)
      
      if(!emailPattern.test(email))
        setEmailErr(true)
      else
        setEmailErr(false)
      
      if(!passPattern.test(password))
        setPassErr(true)
      else
        setPassErr(false)

      return false;
    }
    else{
      if(!namePattern.test(firstName))
        setFNameErr(true)
      else
        setFNameErr(false)

      if(!namePattern.test(lastName))
       setlNameErr(true)
      else
        setlNameErr(false)
      
        if(!emailPattern.test(email))
        setEmailErr(true)
      else
        setEmailErr(false)
      
      if(!passPattern.test(password))
        setPassErr(true)
      else
        setPassErr(false)
      
        return true;
    }
  }

  //traiter les entrée de l'user.
  const handleSubmit= ()=>{
    //si touts les champs est valide, il transforme les donnée en objet->json->axios->server
    if(validate()){
      const birth = birthDay.getFullYear()+'-'+birthDay.getMonth()+'-'+birthDay.getDate();
      const data = {
        'firstName': firstName,
        'lastName' : lastName,
        'email':email,
        'password':MD5(password).toString(), //les password est chiffrée avant les transmetre pour garantie la sécurité des client
        'birthDay': birth
      }
      axios({
        method: 'post',
        url: 'http://10.0.2.2:8080/rest/webresources/users/user',
        data: JSON.stringify(data),
        headers: {
           'Content-Type': 'application/json'
        }
     }).then(resp=>{resp.data})
    }else{
      alert();
    }
  }

  
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Create Account</Text>
      <Input 
        placeholder={'Entrer Vote Prenom'}
        value = {firstName}
        ErrStyle={styles.inputErr}
        Sstyle={styles.input}
        setName={setFirstName}
        error={ fNameErr }
      />
      <Input 
        placeholder={'Entrer Vote Nom'}
        value = {lastName}
        ErrStyle={styles.inputErr}
        Sstyle={styles.input}
        setName={setLastName}
        error = { lNameErr }
      />
      <Input
        placeholder={'Enter Your Email'}
        value={email}
        ErrStyle={styles.inputErr}
        Sstyle={styles.input}
        setName={setEmail}
        error={emailErr}
      />
      <Input
        placeholder={'Enter Your Password'}
        value={password}
        ErrStyle={styles.inputErr}
        Sstyle={styles.input}
        setName={setPassword}
        error={passwordErr}
        password={true}
      />
      <DatePicker style={ styles.datePicker } setBirthDay={setBirthDay}/>

      <TouchableOpacity style={ styles.btn } onPress={handleSubmit}>
        <Text style={{fontSize:14,color:'#fff',fontWeight:'600'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    view:{
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    title:{
      fontSize:34,
      fontWeight:'bold',
      textTransform:'capitalize',
      color: '#009DAE',
      marginTop:'20%',
      marginBottom:40
    },
    input:{
      height:40,
      borderBottomWidth:1,
      borderBottomColor:'#009DAE',
      textAlign:'center',
      width:'85%',
      marginBottom:15,
      fontSize:20
    },
    inputErr:{
      height:40,
      borderBottomWidth:1,
      borderColor:'#f00',
      borderWidth:1,
      textAlign:'center',
      width:'85%',
      marginBottom:15,
      fontSize:20
    },
    btn:{
      alignItems: "center",
      backgroundColor: "#009DAE",
      width:'85%',
      padding: 10,
      marginTop:15
    },
    datePicker:{
      marginBottom: 25
    }
  })
  