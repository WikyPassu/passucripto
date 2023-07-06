import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderCalculator = ({title}) => {
  return (
    <View style={styles.header}>
      <View style={{width: "auto", flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.text}>{title}</Text>
        <Icon name="calculator" size={30} color="white" style={{marginLeft: 10}} />
      </View>
    </View>
  );
};

export default HeaderCalculator;

const styles = StyleSheet.create({
  header: {
    height: 85,
    padding: 25,
    backgroundColor: "#300060",
    borderBottomWidth: 2,
    borderBottomColor: "#220035"
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Comfortaa-Bold"
  }
});