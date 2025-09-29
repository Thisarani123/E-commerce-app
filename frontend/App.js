import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { I18nProvider } from './src/utils/i18n';
import { store } from './src/store/store';
import MainNavigator from './src/components/navigation/MainNavigator';
import { syncCartOnLogin } from './src/store/productSlice';
import { mergeCart } from './src/store/cartSlice';

// Component to handle cart persistence
function CartPersistenceHandler() {
  const dispatch = useDispatch();
  const { user, triggerCartSync } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && triggerCartSync) {
      // Simulate fetching user's saved cart from server
      const savedCart = { items: [], total: 0 }; // This would come from API
      dispatch(mergeCart(savedCart));
      dispatch(syncCartOnLogin(user.id));
    }
  }, [user, triggerCartSync]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <I18nProvider>
        <NavigationContainer>
          <CartPersistenceHandler />
          <MainNavigator />
        </NavigationContainer>
      </I18nProvider>
    </Provider>
  );
}