import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Header from '../Components/Header'
import ItemListCategory from '../Screens/ItemListCategory'
import Home from '../Screens/Home'
import ItemDetail from '../Screens/ItemDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <SafeAreaView style= {styles.container}>
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName = "Home"
            screenOptions = {
                ({route}) => ({
                    header: () => {
                        return <Header/>
                    }
                }
                )
            }
            >
                <Stack.Screen name= "Home" component = {Home}/>
                <Stack.Screen name= "ItemListCategory" component = {ItemListCategory}/>
                <Stack.Screen name= "Detail" component = {ItemDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  )
}

export default Navigator

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  })