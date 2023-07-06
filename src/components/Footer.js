import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = Dimensions.get('window').width;

const Footer = ({navigationRef, getCurrentRoute}) => {
  const currentRoute = getCurrentRoute();
  let currentTab;
  switch(currentRoute){
    case "List":
      currentTab = 0;
      break;
    case "ListFavorites":
      currentTab = 1;
      break;
    case "Calculator":
      currentTab = 2;
      break;
  }
  return (
      currentRoute == "ListSearch" || currentRoute == "CryptoData" ? null :
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigationRef.navigate("List")}
        >
          <Icon name="home" size={30} color={!currentTab ? "#b25eff" : "white"} />
          <Text style={[styles.text, {color: !currentTab ? "#b25eff" : "white"}]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigationRef.navigate("ListFavorites")}
        >
          <Icon name="heart" size={30} color={currentTab == 1 ? "#b25eff" : "white"} />
          <Text style={[styles.text, {color: currentTab == 1 ? "#b25eff" : "white"}]}>Favoritas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigationRef.navigate("Calculator")}
        >
          <Icon name="calculator" size={30} color={currentTab == 2 ? "#b25eff" : "white"} />
          <Text style={[styles.text, {color: currentTab == 2 ? "#b25eff" : "white"}]}>Conversor</Text>
        </TouchableOpacity>
      </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    height: 75,
    backgroundColor: "#300060",
    borderTopWidth: 2,
    borderTopColor: "#220035"
  },
  button: {
    width: SIZE / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 15,
    color: "white",
    fontFamily: "Comfortaa-Bold"
  }
});