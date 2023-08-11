import { useFonts } from 'expo-font';


import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from "./src/Store/Store"
export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto': require('./src/Assets/Fonts/Roboto/Roboto-ThinItalic.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}

