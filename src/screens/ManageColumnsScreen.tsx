import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {ICard, IColumn} from '../typescript/interfaces';
import {RootState} from '../redux/store';
import CardItem from '../components/CardItem';
import {sagaActions} from '../saga/sagaActions';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import store from '../redux/store';
import {TouchableOpacity} from 'react-native-gesture-handler';

// const Column:React.FC = () => {

// }

const ManageColumnScreen: React.FC = () => {
  const [state, setState] = useState({
    editColumnId: 0,
    title: '',
  });

  const [title, setTitle] = useState({
    columnTitle: '',
  });

  const columns = useSelector((state: RootState) => state.columnStore.columns);
  const dispatch = useDispatch();

  const createHandler = () => {
    dispatch({
      type: sagaActions.CREATE_COLUMN_SAGA,
      payload: {title: title.columnTitle},
    });
    setTimeout(() => {
      dispatch({type: sagaActions.GET_COLUMNS_SAGA});
      setTitle({columnTitle: ''});
    }, 500);
  };

  const editHandler = () => {
    dispatch({
      type: sagaActions.EDIT_COLUMN_SAGA,
      payload: {columnId: state.editColumnId, title: state.title},
    });

    setTimeout(() => {
      dispatch({type: sagaActions.GET_COLUMNS_SAGA});
      setState({editColumnId: 0, title: ''});
    }, 500);
  };

  const deleteHandler = (id: number) => {
    dispatch({
      type: sagaActions.DELETE_COLUMN_SAGA,
      payload: {columnId: id},
    });
    setTimeout(() => {
      dispatch({type: sagaActions.GET_COLUMNS_SAGA});
    }, 500);
  };

  const renderColumn = (item: IColumn) => {
    return (
      <View key={item.id} style={styles.column}>
        <Text>{item.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.editComment}
            onPress={() =>
              setState((state) => ({
                ...state,
                editColumnId: item.id,
                title: item.title,
              }))
            }>
            <Text style={{color: 'white'}}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delComment}
            onPress={() => {
              deleteHandler(item.id);
            }}>
            <Text style={{color: 'white'}}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEditedColumn = (item: IColumn) => {
    return (
      <View key={item.id} style={styles.column}>
        <TextInput
          style={styles.inputComment}
          defaultValue={item.title}
          onChangeText={(text) =>
            setState((state) => ({...state, title: text}))
          }
          value={state.title}></TextInput>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.editComment} onPress={editHandler}>
            <Text style={{color: 'white'}}>DONE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delComment}
            onPress={() => setState((state) => ({...state, editColumnId: 0}))}>
            <Text style={{color: 'white'}}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Current columns</Text>
      {columns.map((item: IColumn) =>
        item.id === state.editColumnId
          ? renderEditedColumn(item)
          : renderColumn(item),
      )}
      <TextInput
        style={styles.inputAddColumn}
        placeholder="Add column title..."
        value={title.columnTitle}
        onChangeText={(text) => setTitle({columnTitle: text})}></TextInput>
      <TouchableOpacity style={styles.createButton} onPress={createHandler}>
        <Text style={{color: 'white'}}>Create column</Text>
      </TouchableOpacity>
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
  column: {
    height: 74,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editComment: {
    backgroundColor: '#72A8BC',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  inputComment: {
    minWidth: 200,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    borderColor: '#e5e5e5',
  },
  delComment: {
    backgroundColor: '#AC5253',
    height: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  inputAddColumn: {
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    borderColor: '#e5e5e5',
  },
  createButton: {
    marginTop: 10,
    backgroundColor: '#72A8BC',
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
});

export default ManageColumnScreen;
