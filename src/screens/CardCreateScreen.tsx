import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {sagaCardActions} from '../store/card/actions';

// function useCreateCard(state: any, columnId) {
//   const dispatch = useDispatch()
//   dispatch({
//     type: sagaCardActions.CREATE_CARDS_SAGA,
//     payload: {
//       title: state.title,
//       description: state.description,
//       checked: false,
//       column: route.params.columnId,
//     },
//   });
//   dispatch({type: sagaCardActions.GET_CARDS_SAGA});

// }

const CardCreateScreen: React.FC = ({navigation, route}: any) => {
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();

  const createCard = () => {
    dispatch({
      type: sagaCardActions.CREATE_CARDS_SAGA,
      payload: {
        title: state.title,
        description: state.description,
        checked: false,
        column: route.params.columnId,
      },
    });
    dispatch({type: sagaCardActions.GET_CARDS_SAGA});
    setState({title: '', description: ''});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setState((state) => ({...state, title: text}))}
        defaultValue={state.title}></TextInput>
      <Text style={styles.label}>Card description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setState((state) => ({...state, description: text}))
        }
        defaultValue={state.description}></TextInput>
      <Button title="Create" onPress={createCard}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    height: '100%',
  },
  label: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    minHeight: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    borderColor: '#e5e5e5',
  },
});

export default CardCreateScreen;
