import React, {useState} from "react"
import {Image, View, StyleSheet, Text} from "react-native"
import * as ImagePicker from "expo-image-picker"
import AddButton from "../Components/AddButton"
import {colors} from "../Global/Colors"
import * as MediaLibrary from "expo-media-library"
import { useDispatch, useSelector } from "react-redux"
import {saveImage} from "../Features/User/userSlice"
import { usePostProfileImageMutation } from "../Services/shopServices"

const ImageSelector = ({navigation}) => {
  const [img, setImg] = useState(null)

  const [triggerSaveImg, resultSaveImg] =  usePostProfileImageMutation()
  const dispatch = useDispatch()

  const {localId} = useSelector((state) => state.userReducer.value)

  const verifyCameraPermission = async() => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync()

    if(!granted) {
      return false
    } return true
  }

  const pickImage = async() => {
    const isCameraOk = await verifyCameraPermission()

    if(isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1
      })

      if (!result.canceled) {
        setImg(result.assets[0].uri)
      }
    }
  }

  const confirmImage = async() => {
    try {
      const {status} = await MediaLibrary.requestPermissionsAsync()
      if (status === "granted") {
        console.log("Only valid on emulators and physical devices");
        const response = await MediaLibrary.createAssetAsync(img)
        triggerSaveImg({
          img: response.uri,
          localId: localId,
        })
        dispatch(saveImage(response.uri))
      } 
    } catch(error) {
      console.log(error)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
            {img ? (
                <>
                    <Image source={{ uri: img }} style={styles.image} />
                    <AddButton title="Please take another photo" onPress={pickImage} />
                    <AddButton title="Confirm photo?" onPress={confirmImage} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text>There's to photo to show...</Text>
                    </View>
                    <AddButton title="Take a photo" onPress={pickImage} />
                </>
            )}
        </View>
  )

}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 20,
      marginTop: 20,
  },
  image: {
      width: 200,
      height: 200,
  },
  noPhotoContainer: {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: colors.red,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
  },
});