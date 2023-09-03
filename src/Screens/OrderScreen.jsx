import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import OrderData from "../Data/orders.json"
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder } from '../Features/Order/OrderSlice'
import { useGetOrdersByUserQuery } from '../Services/shopServices'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const { data: orders, isLoading, isError } = useGetOrdersByUserQuery(user);
  if (isError) {
    // Si hay un error en la consulta, muestra un mensaje de error
    return (
      <View style={styles.container}>
        <Text>Error al cargar órdenes.</Text>
      </View>
    );
  }
  if (!orders || orders.length === 0) {
    // Si no hay órdenes, muestra un mensaje indicando que no hay órdenes
    return (
      <View style={styles.container}>
        <Text>No hay órdenes aún.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList data={orders} keyExtractor={orderItem => orderItem.id} renderItem={({item}) => {
        return(
            <OrderItem order={item} onDelete={() => dispatch(deleteOrder(item.id))}/>
        )
      }}/>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    height: "100%"
  }
})