import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";

const Title = () => {
  return (
    <View>
      <Text style={{fontSize: RFValue(42), fontWeight: 'bold', color: '#ffffff'}}>Weather App</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({})