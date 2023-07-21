import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import Header from './src/Components/Header';
import Home from './src/Screens/Home';
import ItemListCategory from './src/Screens/ItemListCategory';
import { useFonts } from 'expo-font';
import { useState } from 'react';

import Navigator from './src/Navigation/Navigator';


export default function App() {

  const [categorySelected, setCategorySelected] = useState("")
  const [productSelected, setProductSelected] = useState("")

  const [fontsLoaded] = useFonts({
    'Roboto': require('./src/Assets/Fonts/Roboto/Roboto-ThinItalic.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <Navigator/>
  );
}

