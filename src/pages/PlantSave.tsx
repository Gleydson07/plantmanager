import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SvgFromUri from 'react-native-svg'

import waterdrop from '../assets/waterdrop.png'

export function PlantSave(){
    return (
        <>
            <View style={styles.container}>
                <SvgFromUri 
                    uri="a"
                    height={150}
                    width={150}
                />
                <Text style={styles.plantName}>
                    Nome da planta
                </Text>
                <Text style={styles.plantAbout}>
                    Sobre a planta
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos rem 
                    saepe magni odit sit fugit praesentium ullam, temporibus 
                    ipsam rerum doloremque architecto soluta totam, ab error mollitia 
                    iure obcaecati vitae?
                </Text>
            </View>
            <View style={styles.controllers}>
                <View style={styles.tipContainer}>
                    <Image
                        style={styles.tipImage} 
                        source={waterdrop}
                    />
                </View>
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },

    plantName: {

    },

    plantAbout: {

    },

    controllers: {

    },

    tipContainer: {

    },

    tipImage: {
        
    }
})