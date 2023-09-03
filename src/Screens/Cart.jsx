import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

import CartItem from '../Components/CartItem'
import {useSelector } from 'react-redux'
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
                <Text style={styles.totalText}>
                    Confirm total: ${total}
                </Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Cart
const styles = StyleSheet.create({
    container: {
        height:"100%",
        justifyContent: 'space-between',
        marginBottom: 120,
        backgroundColor: colors.darkBlue,

    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        elevation: 4,
        bottom: 65,
        left:"15%",
        backgroundColor: colors.exodusfruit,
        padding: 20,
        borderRadius:10
    },
    totalText: {
        color: colors.hintOfHice
    }
})