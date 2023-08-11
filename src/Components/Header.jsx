import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import {SimpleLineIcons} from "@expo/vector-icons"
import { signOut } from '../Features/User/userSlice';

const Header = ({route, navigation}) => {
  let title
  if (route.name === "Home") title = "Home"
  else if(route.name === "ItemListCategory") title= route.params.category
  else if(route.name === "Detail") title = route.params.title
  else title = route.name

  const dispatch = useDispatch()
  const {email} = useSelector((state) => state.userReducer.value)
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
        <Pressable style= {styles.signOut} onPress={() => dispatch(signOut())}>
          <SimpleLineIcons name='logout' size={24} color="black"/>
        </Pressable>
      ) : null}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        height: '100%',
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