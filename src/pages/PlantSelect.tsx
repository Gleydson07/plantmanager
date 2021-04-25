import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import { EnvironmentButton } from '../components/EnvironmentButton'
import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps{
    key: string;
    title: string;
}

interface PlantsProps{
    id: string;
    name: string;
    about: string;
    waterTips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat: string
    }
}

export function PlantSelect(){
    const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState("all");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    async function fetchPlants(){
        const { data } = await api
        .get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=${8}`);

        if(!data)
            return setLoading(true)

        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }else{
            setPlants(data);
            setFilteredPlants(data)
        }
        setLoading(false);
        setLoadMore(false);
    }

    function handleEnvironmentSelected(environment: string){
        setEnvironmentSelected(environment)

        if(environment === "all")
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered)
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return

        setLoadMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();

    }

    useEffect(() => {
        async function fetchEnvironment(){
            const { data } = await api
            .get(`plants_environments?_sort=title&_order=asc`);
            setEnvironments([{
                key: "all",
                title: "Todos"
            },
            ...data,    
            ]);
        }

        fetchEnvironment();
    }, [])

    useEffect(() => {
        
        fetchPlants();
    }, [])

    if(loading)
        return <Load/>

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                <Text style={styles.title}> Em qual ambiente </Text>
                <Text style={styles.subtitle}> você quer colocar sua planta? </Text>
            </View>
            
            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => String(item.key)} 
                    renderItem={({item}) => (
                        <EnvironmentButton 
                            title={item.title}
                            active={item.key === environmentSelected} 
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}  
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadMore ?
                            <ActivityIndicator color={colors.green}/>
                        :
                            <></>
                    }
                >

                </FlatList>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: colors.background,
    },
    
    header: {
        paddingHorizontal: 30
    },
    
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    
    subtitle: {
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    
    environmentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",   
    },
    
    plantList: {
        // justifyContent: "space-between",
    }

});