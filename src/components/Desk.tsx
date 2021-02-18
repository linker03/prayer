import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Desk = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>My Desk</Text>
        <View style={styles.plusButton}>
          <View style={styles.horizontalVector} />
          <View style={styles.verticalVector} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.text}>To Do</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>In Progress</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Testing</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Completed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  item: {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    marginBottom: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
  },
  plusButton: {
    position: 'absolute',
    right: 30,
    // marginRight: 30,
    width: 18,
    height: 18,
  },
  horizontalVector: {
    width: 16,
    height: 2,
    backgroundColor: '#72A8BC',
    position: 'absolute',
    borderRadius: 50,
    top: 7,
  },
  verticalVector: {
    height: 16,
    width: 2,
    backgroundColor: '#72A8BC',
    position: 'absolute',
    borderRadius: 50,
    left: 7,
  },
});

export default Desk;
