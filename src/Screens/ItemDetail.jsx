import {Button, Image,Pressable,  StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from "../Data/products.json"
import { useDispatch } from 'react-redux'
import { addCartItem } from '../Features/Cart/cartSlice'
import { colors } from '../Global/Colors'

const ItemDetail = ({navigation, route}) => {

  const {productId: idSelected}=  route.params

  const dispatch = useDispatch()

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

  const addOnCart = () => {
    dispatch(addCartItem({
      ...product,
      quantity: 1
    }))
  }
  return (
    <View>
      {/* <Button onPress={()=> navigation.goBack()} title= "goBack"/> */}
      {product ? (
        <View style={orientation === "portrait" ? styles.mainContainer : styles.mainContainerLandscape} > 
          <View style={styles.textContainer}>
          <Image source={{uri: product.images[0]}} resizeMode="cover" style={styles.image}/>
            <Text style= {styles.textTitle}>{product.title}</Text>
            <Text style= {styles.textDescription}>{product.description}</Text>
            <Text style= {styles.textPrice}>${product.price}</Text>
            <Pressable style= {styles.button} onPress={addOnCart}> 
              <Text style= {styles.buttonText}>Add Cart</Text>
            </Pressable>
            {/* <Button  title="Add Cart" onPress={addOnCart}></Button> */}
          </View>
        </View>
      ): console.log("hola")}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
    backgroundColor: colors.darkBlue,
    height:"100%",
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "flex-start",
    padding: 8,
    backgroundColor: colors.darkBlue
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 15,
  },
  textContainer: {
    flexDirection: "column",
    backgroundColor: colors.hintOfHice,
    width:"100%",
    padding:10,
    gap: 15,
    borderRadius: 10
  },
  textTitle: {
    color: colors.darkBlue,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold"
  },
   textDescription: {
    color: colors.darkBlue,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "light"
  },
  textPrice: {
    color: colors.soaringGray,
    textAlign: "right",
    fontSize: 30,
    fontWeight: "light"
  },
  button: {
    height:30,
    backgroundColor: colors.exodusfruit,
    borderRadius:40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: colors.hintOfHice,
    fontSize:25,
    fontWeight: "bold",
  }
})