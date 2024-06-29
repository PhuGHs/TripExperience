import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import Navigator from '@navigation/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@context/auth-context';
import { UserProvider } from '@context/user-context';

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserProvider>
          <Navigator />
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
    
  );
};

export default App;