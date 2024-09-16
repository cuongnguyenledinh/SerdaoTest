import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { useBoundStore } from '../zustand';
import { BeneficiaryProps } from '../zustand/beneficiarySlice';

const AddTransactionScreen = ({ navigation, route }: any) => {
  const beneficiary: BeneficiaryProps = route.params.beneficiary;
  const [amount, setAmount] = useState('');
  const [name, setName] = useState(beneficiary.firstName + ' ' + beneficiary.lastName || '');
  const [iban, setIban] = useState(beneficiary.iban || '');
  const { addTransaction, setBalance, balance } = useBoundStore();

  const handleTransaction = () => {
    addTransaction({
      id: uuidv4(),
      amount: parseFloat(amount),
      account: { name: name, iban: iban },
    });
    setBalance(balance - parseFloat(amount));
    navigation.popToTop();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setAmount}
        value={amount}
        keyboardType='numeric'
        placeholder='Enter amount'
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setName}
        value={name}
        placeholder='Recipient Name'
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setIban}
        value={iban}
        placeholder='Recipient IBAN'
      />
      <Button title='Submit Transaction' onPress={handleTransaction} />
    </View>
  );
};

export default AddTransactionScreen;
