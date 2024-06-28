/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
  
    channelId: '1',
  
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    popInitialNotification: true,
  
    requestPermissions: Platform.OS === 'ios',
  });

