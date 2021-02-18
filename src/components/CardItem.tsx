import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ICard} from '../typescript/interfaces';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ItemProps {
  item: ICard;
  onPress: (cardId: number) => void;
}

const CardItem: React.FC<ItemProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() => onPress(item.id)}>
      <View style={styles.leftSide}>
        <View style={styles.verticalStripe}></View>
        <Text style={styles.title}>{item && item.title}</Text>
      </View>
      <View style={styles.rightSide}>
        <Icon
          name="comment-o"
          size={30}
          color="#72A8BC"
          style={{marginRight: 4}}
        />
        <Text style={styles.comments}>{item.commentsIds.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  comments: {
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  verticalStripe: {
    width: 3,
    height: 24,
    backgroundColor: '#72A8BC',
    borderRadius: 50,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    paddingLeft: 15,
    height: 66,
    backgroundColor: 'white',
    borderBottomColor: '#E5E5E5',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 17,
  },
});

export default CardItem;
