import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CardCreateScreen from '../screens/CardCreateScreen';
import CardDeleteScreen from '../screens/CardDeleteScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import CardEditScreen from '../screens/CardEditScreen';
import ColumnScreen from '../screens/ColumnScreen';

type Props = {
  route: any;
};

export const ColumnStackNavigator: React.FC<Props> = ({route}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Column"
      screenOptions={{
        headerTitle: route.name,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: '#BFB393',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: 0,
        },
        headerTitleStyle: {
          textTransform: 'uppercase',
          color: 'white',
        },
      }}>
      <Stack.Screen
        name="Column"
        component={ColumnScreen}
        initialParams={{columnId: route.params.columnId}}
      />
      <Stack.Screen name="CardDetail" component={CardDetailsScreen} />
      <Stack.Screen name="CardCreate" component={CardCreateScreen} />
      <Stack.Screen name="CardEdit" component={CardEditScreen} />
      <Stack.Screen name="CardDelete" component={CardDeleteScreen} />
    </Stack.Navigator>
  );
};
