import React,{ useState } from 'react';
import { StyleSheet, SafeAreaView, Alert, TextInput,TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api'

export default function Book({navigation, route }){
    const [date,setDate] = useState('');

    const { id } = route.params;

    async function handleSubmit(){
          const user_id = await AsyncStorage.getItem('user');

          await api.post(`/spots/${id}/bookings`,{
              date
          },{
              headers: { user_id }
          })
        Alert.alert("Solicitação de reserva enviada.")

        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
               <TextInput
                 style={styles.input}
                 placeholder="Qual data você quer reservar?"
                 placeholderTextColor="#999"
                 autoCapitalize="words"
                 autoCorrect={false}
                 value={date}
                 onChangeText={setDate}
               />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText} >Solicitar Reserva</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} >
                <Text style={styles.buttonText} >Cancelar</Text>
        </TouchableOpacity> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
       margin: 30
    },
    label: {
        fontWeight: 'bold',
        color: "#444",
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButton: {
        marginTop: 10,
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})