import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Book from './pages/Book';
import List from './pages/List';
import Login from './pages/Login';

const Stack = createStackNavigator();

export default function MainContainer(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen  
                  name="Login"
                  component={Login}
                />
                <Stack.Screen  
                  name="List"
                  component={List}
                />
                <Stack.Screen  
                  name="Book"
                  component={Book}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
    
}