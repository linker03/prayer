import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {sagaCardActions} from '../store/card/actions';

const CardEditScreen: React.FC = ({navigation, route}: any) => {
  const [state, setState] = useState({
    title: route.params.title,
    description: route.params.description,
  });

  const dispatch = useDispatch();

  const editCard = () => {
    dispatch({
      type: sagaCardActions.EDIT_CARD_SAGA,
      payload: {
        cardId: route.params.id,
        body: {
          title: state.title,
          description: state.description,
          checked: false,
          column: route.params.columnId,
        },
      },
    });
    setTimeout(() => {
      dispatch({type: sagaCardActions.GET_CARDS_SAGA});
    }, 500);
    setState({title: '', description: ''});
    navigation.goBack();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card title</Text>
      <TextInput
        style={styles.input}
        defaultValue={state.title}
        onChangeText={(text) =>
          setState((state) => ({...state, title: text}))
        }></TextInput>
      <Text style={styles.label}>Card description</Text>
      <TextInput
        style={styles.input}
        defaultValue={state.description}
        onChangeText={(text) =>
          setState((state) => ({...state, description: text}))
        }></TextInput>
      <Button title="Confirm" onPress={editCard}></Button>
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

export default CardEditScreen;
