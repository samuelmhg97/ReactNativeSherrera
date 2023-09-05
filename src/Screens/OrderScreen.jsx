import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import OrderData from "../Data/orders.json"
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useGetOrdersByUserQuery } from '../Services/shopServices'
import { setOrders } from '../Features/OrderSlice/orderSlice'

const OrderScreen = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.cartReducer.value.user)
  const ordersData= useGetOrdersByUserQuery(user)

  

  useEffect(() => {
    if(ordersData.isSuccess) {
      if (Array.isArray(ordersData.data)) {
        dispatch(setOrders(ordersData.data))
        console.log("order seteada", ordersData.data)
      }
    }
  }, [dispatch, ordersData])

  const orders = useSelector((state) => state.orderReducer.value.orders || [])
  ;
  return (
    <View style={styles.container}>
      <FlatList data={orders} keyExtractor={orderItem => orderItem.id} renderItem={({item}) => {
        return(
            <OrderItem order={item}/>
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