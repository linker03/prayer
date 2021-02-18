import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {sagaActions} from '../saga/sagaActions';

interface IProps {
  navigation: any;
}

const SignInScreen: React.FC<IProps> = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const err = useSelector((state: RootState) => state.paramsStore.error);

  const dispatch = useDispatch();

  const pressHandler = () => {
    navigation.navigate('SignUp');
  };

  const loginHandler = () => {
    dispatch({
      type: sagaActions.LOGIN_USER_SAGA,
      payload: {email: state.email, password: state.password},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => setState((state) => ({...state, email: text}))}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.password}
        onChangeText={(text) =>
          setState((state) => ({...state, password: text}))
        }
      />
      <Button title="Sign In" onPress={loginHandler} />
      {err && <Text style={styles.wrong}>Wrong email or password</Text>}
      <Text style={styles.question}>
        First time here?
        <Text style={styles.link} onPress={pressHandler}>
          {' '}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '40%',
    paddingHorizontal: '3%',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },

  input: {
    borderBottomColor: '#72A8BC',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  question: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  link: {
    color: '#72A8BC',
  },
  wrong: {
    color: '#AC5253',
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

export default SignInScreen;
