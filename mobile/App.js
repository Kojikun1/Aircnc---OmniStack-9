import 'react-native-gesture-handler';
import React from 'react'
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket"
])

import MainContainer from './src/routes'


export default function App(){
  return (
    <MainContainer />
  )
}
