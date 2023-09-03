import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const AddButton = ({
    title="",
    onPress = () => {},
    color= colors.hintOfHice
}) => {
  return (
    <Pressable style={{...styles.button, backgroundColor: color}} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: colors.hintOfHice,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderWidth:0,
        borderRadius:50
    },
    text: {
        fontFamily: "Roboto",
        fontSize: 18,
        color: colors.darkBlue,
    },
});