import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../Global/Colors'

const ProductItem = ({item, navigation}) => {

  const {height, width} = useWindowDimensions();


  const onSelect = (id) => {
    navigation.navigate("Detail", {productId: item.id, title: item.title})
  }
  return (

    <Pressable onPress={() => onSelect(item.id)}>
    <Card
      additionalStyle={styles.additionalStylesCard}
    >
        <Image 
          resizeMode='cover'
          style = {styles.image}
          source={{uri: item.images[0]}}
        />
        <Text style={width > 350 ? styles.title : styles.titleSm}>{item.title}</Text>
    </Card>
    </Pressable>

  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: "90%",
    borderRadius: 8,
  },
  additionalStylesCard: {
    flexDirection: 'column',
    height: 200,
    width:"100%",
    justifyContent: 'space-between',
    backgroundColor: colors.hintOfHice,
    padding:5,
    gap:5
  },
  title: {
    color: colors.darkBlue,
    width: "95%",
    marginLeft:10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  titleSm: {
    color: "blue",
    width: "60%",
    fontSize: 14

  }
})