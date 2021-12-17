import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ setBirthDay }){
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setBirthDay(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={{width:'85%'}}>
      <View>
        <TouchableOpacity style={styles.btn} onPress={showDatepicker}>
            <Text style={{fontSize:14,color:'#fff',fontWeight:'600'}}>Date De Naissance</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          value={new Date()}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    btn:{
        alignItems: "center",
        backgroundColor: "#009DAE",
        padding: 10,
        marginTop:15,
      },
})
