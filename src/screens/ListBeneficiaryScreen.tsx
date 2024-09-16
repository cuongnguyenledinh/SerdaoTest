import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BeneficiaryProps } from '../zustand/beneficiarySlice';
import { useBoundStore } from '../zustand';

const ListBeneficiaryScreen = ({ navigation }: any) => {
  const listBeneficiary = useBoundStore((state) => state.listBeneficiary);

  const handleAddNewBeneficiary = () => {
    navigation.navigate('AddNewBeneficiary');
  };

  const renderItem = ({ item }: { item: BeneficiaryProps }) => {
    const onPressBeneficiary = () => {
      navigation.navigate('AddTransaction', { beneficiary: item });
    };

    return (
      <TouchableOpacity style={styles.item} onPress={onPressBeneficiary}>
        <Text style={styles.itemText}>First name: {item.firstName}</Text>
        <Text style={styles.itemText}>Last name: {item.lastName}</Text>
        <Text style={styles.itemText}>IBAN: {item.iban}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Add new beneficiary' onPress={handleAddNewBeneficiary} />
      <FlatList
        data={listBeneficiary}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default ListBeneficiaryScreen;
