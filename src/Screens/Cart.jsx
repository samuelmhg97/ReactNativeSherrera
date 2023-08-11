import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import CartData from "../Data/cart.json"
import CartItem from '../Components/CartItem'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { usePostCartMutation } from '../Services/shopServices'


const Cart = () => {
    const {items: CartData, total, updatedAt, user} = useSelector( state => state.cartReducer.value)
    const [triggerPostCart, result] = usePostCartMutation()

    const onConfirm = () => {
        triggerPostCart({items: CartData, total, user, updatedAt})
    }

  return (
    <View style = {styles.container}>
        <FlatList 
        data={CartData} 
        keyExtractor={cartItem => cartItem.id} 
        renderItem={({item}) => {
            return ( 
            <CartItem cartItem={item} />
            )
        }} />
        <View style= {styles.totalContainer}>
            <Pressable onPress={onConfirm}>
                <Text>
                    Confirm
                </Text>
            </Pressable>
            <Text> total: ${total}</Text>
        </View>
    </View>
  )
}

export default Cart
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})