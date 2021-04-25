import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImg from '../assets/user.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user')

            setUserName(user || 'Jonh Doe');           
        }

        loadStorageUserName();

    }, [userName])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image 
                style={styles.userImage}
                source={userImg} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: getStatusBarHeight(),
    },

    greeting:{
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading
    },

    userName: { 
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },

    userImage: {
        width: 70,
        height: 70,
        borderRadius: 35
    }
})