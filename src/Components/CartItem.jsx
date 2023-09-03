import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import {Entypo} from "@expo/vector-icons"
import { useDispatch } from 'react-redux'
import { removeCartItem } from '../Features/Cart/cartSlice'

const CartItem = ({cartItem}) => {

  const dispatch = useDispatch()

  const handleRemoveItem = () => {
    dispatch(removeCartItem({id: cartItem.id}))
  }
  return (
    <View style={styles.card} onPress ={()=>{}}>
      <View style = {styles.textContainer}>
        <Text style={styles.text}>{cartItem.title}({cartItem.quantity})</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>${cartItem.price}</Text>
      </View>
      <Pressable onPress={handleRemoveItem}>
        <Entypo name='cross' size={30} color={colors.darkBlue}/>
      </Pressable>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    card: {
        height:100,
        backgroundColor: colors.hintOfHice,
        padding:10,
        margin:10,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    text: {
        fontFamily: "Roboto",
        fontSize: 19,
        color: colors.darkBlue
    },
    text2: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: colors.darkBlue
    }
})