import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store/store';
import {AuthRoute} from './routes/AuthRoute';
import {AuthorizedRoute} from './routes/AuthorizedRoute';
import {sagaAuthActions} from './store/auth/actions';

const App: React.FC = () => {
  const [start, setStart] = useState(true);
  const params = useSelector((state: RootState) => state.authStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (start) {
      dispatch({
        type: sagaAuthActions.CHECK_LOGIN,
      });
      setStart(false);
    }
  });
  console.log(params);
  return (
    <NavigationContainer>
      {params.onLogin ? <AuthorizedRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

export default App;
