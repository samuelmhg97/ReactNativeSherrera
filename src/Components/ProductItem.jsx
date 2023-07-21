import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'

const ProductItem = ({item, navigation}) => {

  const {height, width} = useWindowDimensions();

  console.log(height, width)

  const onSelect = (id) => {
    navigation.navigate("Detail", {productId: item.id})
  }
  return (

    <Pressable onPress={() => onSelect(item.id)}>
    <Card
      additionalStyle={styles.additionalStylesCard}
    >
        <Text style={width > 350 ? styles.title : styles.titleSm}>{item.title}</Text>
        <Image 
          resizeMode='cover'
          style = {styles.image}
          source={{uri: item.images[0]}}
        />
    </Card>
    </Pressable>

  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 100,
    borderRadius: 8
  },
  additionalStylesCard: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between'
  },
  title: {
    color: "red",
    width: 200,
    marginLeft:10,
    fontSize: 16
  },
  titleSm: {
    color: "blue",
    width: 100,
    fontSize: 14

  }
})