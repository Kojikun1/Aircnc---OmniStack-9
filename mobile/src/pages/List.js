import React,{ useState,useEffect } from 'react';
import {Alert, SafeAreaView,ScrollView, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List(){
    const [techs,setTechs] = useState([]);

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.105:3333',{
                query: { user_id }
            })
            socket.on('booking_response', booking => {
                console.log('Successfull event response')
                Alert.alert(`Sua Reserva em ${booking.spot.company} na data de ${booking.date}, foi ${booking.approved ? "APROVADA" : "REJEITADA"}`)
            })
        })

    },[])

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map( item => item.trim())

            setTechs(techsArray);
        })

    },[])

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                 {techs.map(tech => <SpotList key={tech} tech={tech}  />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})