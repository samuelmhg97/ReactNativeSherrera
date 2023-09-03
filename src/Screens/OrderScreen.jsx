import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import OrderData from "../Data/orders.json"
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useGetOrdersByUserQuery } from '../Services/shopServices'

const OrderScreen = () => {

  const email = useSelector(state => state.userReducer.value.email)
  const {data: orders} = useGetOrdersByUserQuery(email)

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