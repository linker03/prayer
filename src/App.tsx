import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ColumnScreen from './screens/ColumnScreen';
import CardDetailsScreen from './screens/CardDetailsScreen';
import CardCreateScreen from './screens/CardCreateScreen';
import CardEditScreen from './screens/CardEditScreen';
import CardDeleteScreen from './screens/CardDeleteScreen';
import ManageColumnsScreen from './screens/ManageColumnsScreen';

import {createStackNavigator} from '@react-navigation/stack';
import store from './redux/store';
import {RootState, AppDispatch} from './redux/store';
import {sagaActions} from './saga/sagaActions';
import {
  MaterialTabParamList,
  ColumnScreenRouteProp,
  IColumn,
} from './typescript/interfaces';

type Props = {
  route: any;
};

const ColumnStackNavigator: React.FC<Props> = ({route}) => {
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

const App: React.FC = () => {
  const [state, setState] = useState({
    onStart: true,
  });

  const params = useSelector((state: RootState) => state.paramsStore);
  const columns = useSelector((state: RootState) => state.columnStore.columns);

  useEffect(() => {
    if (state.onStart && params.onLogin) {
      loadData();
      setState({onStart: false});
    }
  });

  const dispatch = useDispatch();

  const loginStack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  const loadData = () => {
    dispatch({type: sagaActions.GET_CARDS_SAGA});
    dispatch({type: sagaActions.GET_COMMENTS_SAGA});
    dispatch({type: sagaActions.GET_COLUMNS_SAGA});
  };

  const renderLoginScreen = () => {
    return (
      <loginStack.Navigator headerMode="none">
        <loginStack.Screen name="SignIn" component={SignInScreen} />
        <loginStack.Screen name="SignUp" component={SignUpScreen} />
      </loginStack.Navigator>
    );
  };

  function MyTabBar({navigation}: any) {
    return (
      <Button
        title="Go somewhere"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('SomeScreen');
        }}
      />
    );
  }

  const renderTabs = () => {
    if (columns.length) {
      return (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#72A8BC',
            labelStyle: {
              fontSize: 14,
              color: 'white',
            },
            style: {
              backgroundColor: '#BFB393',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              elevation: 0,
            },
          }}>
          {columns.map((item: IColumn) => (
            <Tab.Screen
              key={item.id}
              name={item.title}
              component={ColumnStackNavigator}
              initialParams={{columnId: item.id}}
            />
          ))}
          <Tab.Screen
            name="Manage tabs"
            component={ManageColumnsScreen}
            initialParams={{columnId: 1236}}
          />
        </Tab.Navigator>
      );
    } else {
      return <View></View>;
    }
  };

  return (
    <NavigationContainer>
      {params.onLogin ? renderTabs() : renderLoginScreen()}
    </NavigationContainer>
  );
};

export default App;
