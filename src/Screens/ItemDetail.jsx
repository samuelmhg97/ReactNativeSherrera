import {Button, Image,Pressable,  StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from "../Data/products.json"

const ItemDetail = ({navigation, route}) => {

  const {productId: idSelected}=  route.params

  const [product, setProduct] = useState(null)
  const [orientation, setOrientation] = useState("portrait")
  const {width, heigth} = useWindowDimensions()

  useEffect(() => {
    if (width > heigth) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, heigth])

  useEffect(() => {
    const productSelected = allProducts.find((product) => product.id === idSelected)
    setProduct(productSelected)
  }, [idSelected])
  return (
    <View>
      <Button onPress={()=> navigation.goBack()} title= "goBack"/>
      {product ? (
        <View style={orientation === "portrait" ? styles.mainContainer : styles.mainContainerLandscape} > 
          <Image source={{uri: product.images[0]}} resizeMode="cover" style={styles.image}/>
          <View style={styles.textContainer}>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>${product.price}</Text>
            <Button title="Add to Cart"></Button>
          </View>
        </View>
      ): console.log(product)}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 8
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "flex-start",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 300
  },
  textContainer: {
    flexDirection: "column"
  },
})