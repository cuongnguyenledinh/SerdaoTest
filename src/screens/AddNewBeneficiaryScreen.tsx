import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { useBoundStore } from '../zustand';

const AddNewBeneficiaryScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const { addBeneficiary } = useBoundStore();

  const submitAddNewBeneficiary = () => {
    addBeneficiary({ id: uuidv4(), firstName: firstName, lastName: lastName, iban: iban });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setFirstName}
        value={firstName}
        placeholder='First Name'
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setLastName}
        value={lastName}
        placeholder='Last Name'
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setIban}
        value={iban}
        placeholder='Recipient IBAN'
      />
      <Button title='Confirm' onPress={submitAddNewBeneficiary} />
    </View>
  );
};

export default AddNewBeneficiaryScreen;
