import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../saga/sagaActions';

interface IProps {
  navigation: any;
}

const SignUpScreen: React.FC<IProps> = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
  });

  const dispatch = useDispatch();

  const pressHandler = () => {
    navigation.navigate('SignIn');
  };

  const createUserHandler = () => {
    dispatch({
      type: sagaActions.CREATE_NEW_USER_SAGA,
      payload: {email: state.email, name: state.name, password: state.password},
    });
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={state.name}
        onChangeText={(text) => setState((state) => ({...state, name: text}))}
      />
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
      <Button title="Sign Up" onPress={createUserHandler} />
      <Text style={styles.question}>
        Not the first time here?
        <Text style={styles.link} onPress={pressHandler}>
          {' '}
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '30%',
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
});

export default SignUpScreen;
