import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionProvider } from './contexts/TransactionContext';
import HomeScreen from './screens/HomeScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import ListBeneficiaryScreen from './screens/ListBeneficiaryScreen';
import AddNewBeneficiaryScreen from './screens/AddNewBeneficiaryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='AddTransaction' component={AddTransactionScreen} />
          <Stack.Screen name='ListBeneficiary' component={ListBeneficiaryScreen} />
          <Stack.Screen
            name='AddNewBeneficiary'
            component={AddNewBeneficiaryScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
