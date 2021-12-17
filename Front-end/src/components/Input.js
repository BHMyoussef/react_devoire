import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';

export default function Input({placeholder, value, ErrStyle, Sstyle, setName, error, password}) {
  return (
        <TextInput
          placeholder={placeholder}
          value={ value }
          style={ error?ErrStyle:Sstyle }
          onChangeText={ (text) => setName(text) }
          secureTextEntry={password?true:false}
        />
    )
}
