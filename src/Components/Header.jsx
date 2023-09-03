import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Features/User/userSlice';
import {deleteSession} from "../SQLite"

const Header = ({route, navigation}) => {
  let title
  if (route.name === "Home") title = "Home"
  else if(route.name === "ItemListCategory") title= route.params.category
  else if(route.name === "Detail") title = route.params.title
  else title = route.name

  const dispatch = useDispatch()
  const {email, localId} = useSelector((state) => state.userReducer.value)

  const onSignOut = async() =>{
    try {
      console.log("Deleting session...");
      const response = await deleteSession(localId)
      console.log("Session deleted: ")
      console.log(response)
      dispatch(signOut())
    } catch (error) {
      console.log('Error while sign out:')
      console.log(error.message);
    }
  }
  return (
    <View 
        style={styles.containerHeader}>
        <Image
        style={styles.Image}
        source={require('../Assets/Img/LogoOf.png')}
      />
      {
        navigation.canGoBack() ? (
          <Pressable style={styles.pressable} onPress={()=> navigation.goBack()}>
            <AntDesign name='back' size={24} color="white"/>
          </Pressable>
        )
      : null}
      {email ?  (
        <Pressable style= {styles.signOut} onPress={onSignOut}>
          <AntDesign name='logout' size={24} color="white"/>
        </Pressable>
      ) : null}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        // height: '35%',
        paddingVertical: 10,
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    Image:{
        height: 60,
        width:250
    },
    pressable: {
      position: 'absolute',
      right: 30,
      top:"40%"
    },
    signOut: {
      position: "absolute",
      left: 30,
      top: "40%"
    }
})