import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderList = ({title, navigation, cryptos, setModalVisible}) => {
  return (
    <View style={styles.header}>
      <View style={{width: "auto"}}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={{width: "auto", flexDirection: "row"}}>
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="options" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ListSearch", {cryptos: cryptos})}>
          <Icon name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  header: {
    height: 85,
    marginBottom: 5,
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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