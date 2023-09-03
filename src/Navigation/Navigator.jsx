import { View, Text, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import ShopStack from './ShopStack'
import CartStack from './CartStack'

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { colors } from '../Global/Colors'
import {Fontisto, Foundation, FontAwesome5, Ionicons} from "@expo/vector-icons"

import OrderStack from './OrderStack'
import AuthStack from './AuthStack'
import { useDispatch, useSelector } from 'react-redux'
import MyProfileStack from './MyProfileStack'
import { getSession } from '../SQLite'
import { setUser } from '../Features/User/userSlice'

const Tab = createBottomTabNavigator()

const Navigator = () => {
    const {email, localId}=  useSelector(state => state.userReducer.value)

    const dispath = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                console.log("Getting Session")
                const session = await getSession()
                if(session?.rows.legth) {
                    const user = session.rows._array[0]
                    dispath(setUser(user))
                }
            } catch (error) {
                console.log("error getting session")
                console.log(error.message)
            }
        }) ()
    }, [])
  return (
    <SafeAreaView style= {styles.container}>
        <NavigationContainer>
            {
                email ?
                <Tab.Navigator screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar
                }}>
                    <Tab.Screen name= "Shop" component={ShopStack} options={{tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <Fontisto name='shopping-store' size={24} color={focused ? "black": "gray"}/>
                            </View>
                        )
                    }}} />
                    <Tab.Screen name= "Cart" component={CartStack} options={{tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <Foundation name='shopping-cart' size={24} color={focused ? "black": "gray"}/>
                            </View>
                        )
                    }}} />
                    <Tab.Screen name= "Orders" component={OrderStack} options={{tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <FontAwesome5 name='list-ul' size={24} color={focused ? "black": "gray"}/>
                            </View>
                        )
                    }}} />
                    <Tab.Screen name= "MyProfile" component={MyProfileStack} options={{tabBarIcon: ({focused}) => {
                        return (
                            <View>
                                <Ionicons name='person-circle-outline' size={24} color={focused ? "black": "gray"}/>
                            </View>
                        )
                    }}}
                    />
    
                </Tab.Navigator>
                : <AuthStack/>
            } 
           
        </NavigationContainer>
    </SafeAreaView>
  )
}

export default Navigator

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    tabBar: {
        backgroundColor: colors.aqua,
        shadowColor: 'black',
        elevation: 4,
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 90,
    }
  })