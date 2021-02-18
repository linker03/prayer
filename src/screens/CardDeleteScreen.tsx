import React from 'react';
import {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../saga/sagaActions';

const CardDeleteScreen: React.FC = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const deleteCard = () => {
    dispatch({
      type: sagaActions.DELETE_CARD_SAGA,
      payload: {cardId: route.params.id},
    });
    setTimeout(() => {
      dispatch({type: sagaActions.GET_CARDS_SAGA});
    }, 500);
    navigation.goBack();
    navigation.goBack();
  };

  return (
    <View>
      <Text>Are you sure want delete card {route.params.title}</Text>
      <View>
        <Button title="DELETE" onPress={deleteCard} />
        <Button title="CANCEL" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default CardDeleteScreen;
