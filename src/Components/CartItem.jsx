import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import {Entypo} from "@expo/vector-icons"

const CartItem = ({cartItem}) => {
  return (
    <View style={styles.card} onPress ={()=>{}}>
      <View style = {styles.textContainer}>
        <Text style={styles.text}>{cartItem.title}({cartItem.quantity})</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>${cartItem.price}</Text>
      </View>
      <Entypo name='trash' size={30} color="white"/>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    card: {
        height:100,
        backgroundColor: colors.aqua,
        padding:10,
        margin:10,
        borderWidth: 2,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    text: {
        fontFamily: "Roboto",
        fontSize: 19,
        color: colors.lightAqua
    },
    text2: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: colors.white
    }
})