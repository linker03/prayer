import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ManageColumnsScreen from '../screens/ManageColumnsScreen';
import {sagaCardActions} from '../store/card/actions';
import {sagaColumnActions} from '../store/column/actions';
import {sagaCommentActions} from '../store/comment/actions';
import {RootState} from '../store/store';
import {IColumn} from '../utils/interfaces';
import {ColumnStackNavigator} from './StackNavigator';

export const AuthorizedRoute: React.FC = () => {
  const [state, setState] = useState({
    onStart: true,
  });

  const params = useSelector((state: RootState) => state.authStore);
  const columns = useSelector((state: RootState) => state.columnStore.columns);

  useEffect(() => {
    if (state.onStart && params.onLogin) {
      loadData();
      setState({onStart: false});
    }
  });

  const dispatch = useDispatch();

  const Tab = createMaterialTopTabNavigator();

  const loadData = () => {
    dispatch({type: sagaCardActions.GET_CARDS_SAGA});
    dispatch({type: sagaCommentActions.GET_COMMENTS_SAGA});
    dispatch({type: sagaColumnActions.GET_COLUMNS_SAGA});
  };

  if (columns.length) {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#72A8BC',
          labelStyle: {
            fontSize: 14,
            color: 'white',
          },
          style: {
            backgroundColor: '#BFB393',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}>
        {columns.map((item: IColumn) => (
          <Tab.Screen
            key={item.id}
            name={item.title}
            component={ColumnStackNavigator}
            initialParams={{columnId: item.id}}
          />
        ))}
        <Tab.Screen
          name="Manage tabs"
          component={ManageColumnsScreen}
          initialParams={{columnId: 1236}}
        />
      </Tab.Navigator>
    );
  } else {
    return <View></View>;
  }
};
