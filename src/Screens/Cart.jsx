import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../Global/Colors'

import CartItem from '../Components/CartItem'
import {useDispatch, useSelector } from 'react-redux'
import { usePostCartMutation } from '../Services/shopServices'
import { removeAllItems, setUserForCart } from '../Features/Cart/cartSlice'
import { useGetOrdersByUserQuery } from '../Services/shopServices'


const Cart = () => {
    const {items: CartData, total, updatedAt} = useSelector( state => state.cartReducer.value)
    const user = useSelector(state => state.userReducer.value)

    const dispatch = useDispatch()

    
    const [triggerPostCart, result] = usePostCartMutation()
    
    useEffect(() => {
        if (result.isSuccess) {
        dispatch(setUserForCart(user.email))
        dispatch(removeAllItems())
        }
      }, [result.isSuccess, dispatch, user])

    const onConfirm = () => {
        if (!user) {
            // El usuario no está configurado, muestra un mensaje de error o redirige a la pantalla de inicio de sesión.
            console.log("El usuario no está configurado. Redirige a la pantalla de inicio de sesión.");
            // Puedes mostrar una alerta o redirigir a la pantalla de inicio de sesión.
        } else {
            // El usuario está configurado, procede a postear la orden.
            triggerPostCart({ items: CartData, total, user:user.email , updatedAt });
        }
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