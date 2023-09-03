import { useFonts } from 'expo-font';


import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from "./src/Store/Store"
import { dropTableSessions, init } from './src/SQLite';
import { useEffect } from 'react';


export default function App() {

  useEffect(() => {
    init()
    .then((result) => {
      console.log('Db initialized/dropped')
      console.log(result);
    })
    .catch((error) => {
      console.log("Initialization DB failed:");
      console.log(error.message);
    })
  }, [])
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

