import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import {AuthRoute} from './routes/AuthRoute';
import {AuthorizedRoute} from './routes/AuthorizedRoute';

const App: React.FC = () => {
  const params = useSelector((state: RootState) => state.authStore);
  console.log(params);
  return (
    <NavigationContainer>
      {params.onLogin ? <AuthorizedRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

export default App;
