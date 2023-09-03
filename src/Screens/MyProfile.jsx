import { Image, StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { colors } from "../Global/Colors";
import AddButton from "../Components/AddButton";
import * as ImagePicker from "expo-image-picker"
import { useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../Services/shopServices";

const MyProfile = ({navigation}) => {


    const {localId, profileImage} = useSelector(state => state.userReducer.value)

    const {data: image} = useGetProfileImageQuery(localId)


    const cameraImage = image?.image

    const launchCamera = async () => {
        navigation.navigate('Image Selector')
    };

    const launchLocation = async() => {
        navigation.navigate("List Address")
    }


    return (
        <View style={styles.container}>
            {profileImage || cameraImage  ? (
                <Image
                    source={{uri: profileImage || cameraImage}}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={require("../Assets/Img/perfil.png")}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <AddButton onPress={launchCamera} title="Add profile picture" />
            <AddButton onPress={launchLocation} title="Add Address"/>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.darkBlue,
        height:"100%"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});