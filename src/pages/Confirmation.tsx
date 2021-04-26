import React from 'react'
import { 
    SafeAreaView, 
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import {Button} from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationProps{
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: string;
}

const emojis = {
    smile: '😄',
    hug: '🤗',
}

export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = routes.params as ConfirmationProps

    function handleMoveOn(){
        navigation.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                   {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title={buttonTitle}
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },

    emoji: {
        fontSize: 72,
        marginBottom: 20
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: 'center',
        lineHeight: 38,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        color: colors.heading,
        paddingVertical: 10,
        lineHeight: 38,
    },

    footer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 50,

    }
})