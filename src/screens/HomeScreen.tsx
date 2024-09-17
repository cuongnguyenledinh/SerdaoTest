import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useBoundStore } from '../zustand';
import { TransactionProps } from '../zustand/transactionSlice';

const HomeScreen = ({ navigation }: any) => {
  const { listTransaction, balance } = useBoundStore();

  const handleAddTransaction = () => navigation.navigate('ListBeneficiary');

  const renderItem = ({ item }: { item: TransactionProps }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Current Balance: ${balance.toFixed(2)}</Text>

      <Button title='Add Transaction' onPress={handleAddTransaction} />

      {listTransaction.length > 0 ? <Text style={styles.title}>Transaction history:</Text> : null}
      <FlatList
        data={listTransaction}
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
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default HomeScreen;
