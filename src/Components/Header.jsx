import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { AntDesign } from "@expo/vector-icons";

const Header = ({route, navigation}) => {
  let title
  if (route.name === "Home") title = "Home"
  else if(route.name === "ItemListCategory") title= route.params.category
  else if(route.name === "Detail") title = route.params.title
  else title = route.name
  return (
    <View 
        style={styles.containerHeader}>
        <Image
        style={styles.Image}
        source={require('../Assets/Img/LogoOf.png')}
      />
      {route.name !== "Home" ? (
        <Pressable style={styles.pressable} onPress={()=> navigation.goBack()}>
          <AntDesign name='back' size={25} color="white"/>
        </Pressable>
      ): null}
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
    }
})