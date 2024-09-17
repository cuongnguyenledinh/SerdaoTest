import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { isValidIBAN } from 'ibantools';

import { useBoundStore } from '../zustand';
import { BeneficiaryProps } from '../zustand/beneficiarySlice';

const AddTransactionScreen = ({ navigation, route }: any) => {
  const beneficiary: BeneficiaryProps | undefined = route?.params?.beneficiary;
  const passedName =
    beneficiary?.firstName || beneficiary?.lastName
      ? beneficiary?.firstName + ' ' + beneficiary?.lastName
      : null;
  const [amount, setAmount] = useState('');
  const [errorAmount, setErrorAmount] = useState('');
  const [name, setName] = useState(passedName?.trim() || '');
  const [errorName, setErrorName] = useState('');
  const [iban, setIban] = useState(beneficiary?.iban || '');
  const [errorIban, setErrorIban] = useState('');
  const { addTransaction, setBalance, balance } = useBoundStore();

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
    setErrorAmount('');
    setErrorName('');
    setErrorIban('');
  }, [amount.length, name.length, iban.length]);

  const handleSubmitTransaction = () => {
    // Check if amount is not empty and is valid positive float
    const isValidAmount = (value: string) => {
      const regexPositiveFloat = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
      return amount.length > 0 && regexPositiveFloat.test(value);
    };

    if (!isValidAmount(amount)) {
      setErrorAmount('Invalid amount');
      return;
    }

    // Check balance is enough
    if (parseFloat(amount) > balance) {
      setErrorAmount('Not enough balance');
      return;
    }

    // Check name is not empty
    if (name.length <= 0) {
      setErrorName('Invalid name');
      return;
    }

    // Final check valid IBAN then add transaction
    const res = isValidIBAN(iban);
    if (res) {
      addTransaction({
        id: uuidv4(),
        amount: parseFloat(amount),
        account: { name: name.trim(), iban: iban },
      });
      setBalance(balance - parseFloat(amount));
      navigation.popToTop();
    } else {
      setErrorIban('Invalid IBAN');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amount</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorAmount.length > 0 ? 0 : 22 }]}
        onChangeText={setAmount}
        value={amount}
        keyboardType='numeric'
        placeholder='Enter amount'
      />
      {errorAmount.length > 0 ? <Text style={styles.error}>{errorAmount}</Text> : null}

      <Text style={styles.title}>Name</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorName.length > 0 ? 0 : 22 }]}
        onChangeText={setName}
        value={name}
        placeholder='Recipient Name'
      />
      {errorName.length > 0 ? <Text style={styles.error}>{errorName}</Text> : null}

      <Text style={styles.title}>IBAN</Text>
      <TextInput
        style={[styles.input, { marginBottom: errorIban.length > 0 ? 0 : 22 }]}
        onChangeText={setIban}
        value={iban}
        placeholder='Recipient IBAN'
      />
      {errorIban.length > 0 ? <Text style={styles.error}>{errorIban}</Text> : null}

      <Button title='Submit Transaction' onPress={handleSubmitTransaction} />
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

export default AddTransactionScreen;
