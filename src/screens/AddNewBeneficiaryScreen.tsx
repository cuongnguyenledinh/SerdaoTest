import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { isValidIBAN } from 'ibantools';

import { useBoundStore } from '../zustand';

const AddNewBeneficiaryScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [iban, setIban] = useState('');
  const [errorIban, setErrorIban] = useState('');
  const { addBeneficiary, listBeneficiary } = useBoundStore();

  const HeaderRightBtn = (
    <Text style={styles.cancelBtn} onPress={() => navigation.goBack()}>
      Cancel
    </Text>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderRightBtn,
    });
  }, []);

  useEffect(() => {
    setErrorName('');
    setErrorIban('');
  }, [firstName.length, firstName.length, iban.length]);

  const submitAddNewBeneficiary = () => {
    // Check if name is empty, accept one of firstName or lastName is empty
    if (firstName.length <= 0 && lastName.length <= 0) {
      setErrorName('Name cannot be empty');
      return;
    }

    // Check valid IBAN
    const res = isValidIBAN(iban);
    if (res) {
      // Check if IBAN is existed
      const test = listBeneficiary.find((val) => val.iban === iban);
      if (test) {
        setErrorIban('IBAN existed');
        return;
      }

      addBeneficiary({ id: uuidv4(), firstName: firstName, lastName: lastName, iban: iban });
      navigation.goBack();
    } else {
      setErrorIban('Invalid IBAN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First name</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorName.length > 0 ? 0 : 22 }]}
        onChangeText={setFirstName}
        value={firstName}
        placeholder='Enter first name'
      />
      {errorName.length > 0 ? <Text style={styles.error}>{errorName}</Text> : null}

      <Text style={styles.title}>Last name</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorName.length > 0 ? 0 : 22 }]}
        onChangeText={setLastName}
        value={lastName}
        placeholder='Enter last name'
      />
      {errorName.length > 0 ? <Text style={styles.error}>{errorName}</Text> : null}

      <Text style={styles.title}>IBAN</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorIban.length > 0 ? 0 : 22 }]}
        onChangeText={setIban}
        value={iban}
        placeholder='Enter IBAN'
      />
      {errorIban.length > 0 ? <Text style={styles.error}>{errorIban}</Text> : null}

      <Button title='Confirm' onPress={submitAddNewBeneficiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  error: {
    color: 'red',
    fontSize: 12,
    lineHeight: 22,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    width: '80%',
    marginTop: 4,
  },
  cancelBtn: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default AddNewBeneficiaryScreen;
