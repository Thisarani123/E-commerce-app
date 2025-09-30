// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { I18nProvider } from './src/utils/i18n';
import { store } from './src/store/store';
import MainNavigator from './src/components/navigation/MainNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <I18nProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </I18nProvider>
    </Provider>
  );
}