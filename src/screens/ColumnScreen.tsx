import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {
  ICard,
  ColumnScreenRouteProp,
  ColumnScreenNavigationProp,
} from '../utils/interfaces';
import {RootState} from '../store/store';
import CardItem from '../components/CardItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  navigation: ColumnScreenNavigationProp;
  route: ColumnScreenRouteProp;
};

const ColumnScreen: React.FC = ({navigation, route}: any) => {
  const cards = useSelector((state: RootState) => state.cardsStore.cards);
  const dispatch = useDispatch();

  const properCards = cards.filter(
    (item: ICard) => item.columnId === route.params.columnId,
  );

  const onItemPress = (cardId: number) => {
    navigation.navigate('CardDetail', {cardId: cardId});
  };

  return (
    <View style={styles.container}>
      {properCards.map((item: ICard, i: number) => {
        return <CardItem key={i} item={item} onPress={onItemPress} />;
      })}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          navigation.navigate('CardCreate', {
            columnId: route.params.columnId,
          });
        }}>
        <Text style={styles.createButtonText}>Create Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  createButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#72A8BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: 'white',
  },
});

export default ColumnScreen;
