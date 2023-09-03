    import { View, Text, Pressable, StyleSheet } from 'react-native'
    import React from 'react'
    import InputForm from '../Components/InputForm'
    import SubmitButton from '../Components/SubmitButton'
    import { colors } from '../Global/Colors'
    import { useSignInMutation } from '../Services/authServices'
    import { isAtLeastSixCharacters, isValidEmail } from '../Validations/auth'
    import { useDispatch } from 'react-redux'
    import { setUser } from '../Features/User/userSlice'
    import { useEffect, useState } from 'react'

    const LoginScreen = ({navigation}) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const [errorEmail, setErrorEmail] = useState('')
        const [errorPassword, setErrorPassword] = useState('')

        const dispatch = useDispatch() 
        const [triggerSignIn, resultSignIn] = useSignInMutation();

        const onSubmit =() => {
            const isValidVariableEmail = isValidEmail(email)
            const isCorrectPassword = isAtLeastSixCharacters(password)

            
            if (isValidVariableEmail & isCorrectPassword) {
                triggerSignIn({
                    email,
                    password,
                    returnSecureToken: true,
                })
            }
            if (!isValidVariableEmail) setErrorEmail("Email is not correct! please try again")
            else setErrorEmail("")
        
            if (!isCorrectPassword) setErrorPassword("Wrong password! please try again")
            else setErrorPassword("")
        }

        useEffect(()=> {
            (async() => {
                try {
                    if(resultSignIn.isSuccess) {
                        console.log("inserting session")
                        const response = await insertSession({
                            idToken: resultSignIn.data.idToken,
                            localId: resultSignIn.data.localId,
                            email: resultSignIn.data.email,
                        })
                        console.log('Session inserted: ');
                        console.log(response);
                        dispatch(setUser({
                            email: resultSignIn.data.email,
                            idToken: resultSignIn.data.idToken,
                            localId: resultSignIn.data.localId,
                            profileImage: "",
                            location: {
                                latitude: "",
                                longitude: "",
                            }
                        }))
                    } 
                } catch(error) {
                    console.log(error)
                }
            })()
            },[resultSignIn])

    return (
    <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to start</Text>
                <InputForm 
                    label={"email"}
                    onChange={(email)=>{setEmail(email)}}
                    error={errorEmail}
                />
                <InputForm 
                    label={"password"}
                    onChange={(password)=>{setPassword(password)}}
                    error={errorPassword}
                    isSecure={true}
                />
                <SubmitButton 
                    onPress={onSubmit}
                    title = "Send"
                />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={()=> navigation.navigate('Signup')}>
                    <Text style={styles.subLink}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
    }

    export default LoginScreen

    const styles = StyleSheet.create({
        main: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        container: {
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.lightAqua,
            gap: 15,
            paddingVertical: 20,
            borderRadius: 10,
        },
        title: {
            fontSize: 22,
            fontFamily: 'Roboto'
        },
        sub: {
            fontSize: 14,
            color: 'black',
        },
        subLink: {
            fontSize: 14,
            color: 'blue',
        }
    })