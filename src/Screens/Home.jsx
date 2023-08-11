import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import categories from '../Data/categories.json'
import CategoryItem from '../Components/CategoryItem'
import Counter from '../Components/Counter'
import { useGetCategoriesQuery } from '../Services/shopServices'

const Home = ({
  navigation
}) => {

  const {data: categories, isLoading, isError} = useGetCategoriesQuery()

  return (
    <View style={styles.container}>
      <Counter/>
        <FlatList
            data = {categories}
            keyExtractor={category => category}
            renderItem={({item}) => <CategoryItem item={item} navigation={navigation}/>}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle= {styles.wrapper}
            horizontal ={ true}
            style= {styles.flatlist}
        />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: '90%',
        backgroundColor: colors.lightAqua,
        alignItems: 'center'
    },
    wrapper: {
      gap:15
    },
    flatlist: {
      width: "80%"
    }
})