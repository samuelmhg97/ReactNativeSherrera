import { View, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../Features/Shop/shopSlice'
import { colors } from '../Global/Colors'

const CategoryItem = ({
  item,
  navigation
}) => {
  const {width} = useWindowDimensions()

  const dispatch = useDispatch()

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item))
    navigation.navigate("ItemListCategory", {category: item})
  }

  return (
    <View style= {{width: width, alignItems: "center"}}>
    <Pressable
      onPress={onSelectCategory}
    >
      <Card additionalStyle={styles.additionalStyle}>
          <Text style={styles.textCategory}>{item}</Text>
      </Card>
    </Pressable>
    </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    textCategory: {
        fontSize: 18
    },
    additionalStyle:{
      borderRadius: 15,
      height:60,
      backgroundColor: colors.hintOfHice
    }
})