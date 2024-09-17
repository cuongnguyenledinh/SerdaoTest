import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BeneficiaryProps } from '../zustand/beneficiarySlice';
import { useBoundStore } from '../zustand';

const ListBeneficiaryScreen = ({ navigation }: any) => {
  const listBeneficiary = useBoundStore((state) => state.listBeneficiary);

  const handleAddNewBeneficiary = () => {
    navigation.navigate('AddNewBeneficiary');
  };

  const handleContinueTransaction = () => {
    navigation.navigate('AddTransaction');
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
    <View style={styles.container}>
      <Button title='Continue transaction' onPress={handleContinueTransaction} />
      <Button title='Add new beneficiary' onPress={handleAddNewBeneficiary} />

      {listBeneficiary.length > 0 ? <Text style={styles.title}>Saved Beneficiaries:</Text> : null}
      <FlatList
        data={listBeneficiary}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: Dimensions.get('window').width - 32,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 6,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default ListBeneficiaryScreen;
