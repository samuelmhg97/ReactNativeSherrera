import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const Header = () => {
  return (
    <View 
        style={styles.containerHeader}>
        <Image
        style={styles.Image}
        source={require('../Assets/Img/LogoOf.png')}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        height: '12%',
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    Image:{
        height: 60,
        width:250
    }
})