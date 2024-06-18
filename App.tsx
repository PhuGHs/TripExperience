import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';
import Navigator from '@navigation/Navigator';
// import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// const fetchFonts = () => {
//   return Font.loadAsync({
//     'NunitoSans-Black': require('./src/assets/fonts/NunitoSans_10pt-Black.ttf'),
//     'NunitoSans-Bold': require('./src/assets/fonts/NunitoSans_10pt-Bold.ttf'),
//     'NunitoSans-BoldItalic': require('./src/assets/fonts/NunitoSans_10pt-BoldItalic.ttf'),
//     'NunitoSans-Italic': require('./src/assets/fonts/NunitoSans_10pt-Italic.ttf'),
//     'NunitoSans-Light': require('./src/assets/fonts/NunitoSans_10pt-Light.ttf'),
//     'NunitoSans-Medium': require('./src/assets/fonts/NunitoSans_10pt-Medium.ttf'),
//     'NunitoSans-Regular': require('./src/assets/fonts/NunitoSans_10pt-Regular.ttf'),
//     'NunitoSans-SemiBold': require('./src/assets/fonts/NunitoSans_10pt-SemiBold.ttf'),
//     'NunitoSans-SemiBoldItalic': require('./src/assets/fonts/NunitoSans_10pt-SemiBoldItalic.ttf'),
//   });
// };

const App = () => {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // useEffect(() => {
  //   fetchFonts().then(() => {
  //     setFontLoaded(true);
  //   });
  // }, []);

  // if (!fontLoaded) {
  //   return null;
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigator />
    </GestureHandlerRootView>
    
  );
};

export default App;