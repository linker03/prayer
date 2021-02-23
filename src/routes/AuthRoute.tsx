import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const loginStack = createStackNavigator();

export const AuthRoute: React.FC = () => {
  return (
    <loginStack.Navigator headerMode="none">
      <loginStack.Screen name="SignIn" component={SignInScreen} />
      <loginStack.Screen name="SignUp" component={SignUpScreen} />
    </loginStack.Navigator>
  );
};
