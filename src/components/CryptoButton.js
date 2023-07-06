import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = Dimensions.get('window').width;

const CryptoButton = ({image, symbol, setModalVisible, currentButton, setCurrentButton}) => {
  let len;
  let fontResize = 25;
  
  if(symbol != null){
    len = symbol.length;
    fontResize = len < 5 ? 25 : len == 5 ? 22 : 17;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setCurrentButton(currentButton);
        setModalVisible(true);
      }}
    >
      {
        !image ? null :
        <Image style={styles.icon} source={symbol != "ARS" && symbol != "USD" ? {uri: image} : image}/>
      }
      {
        <Text style={[styles.text, {fontSize: fontResize}]}>{!symbol ? "Seleccionar" : symbol}</Text>
      }
      <Icon name="caret-down" size={30} color="white" />
    </TouchableOpacity>
  );
};

export default CryptoButton;

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50
  },
  button: {
    width: SIZE / 2.25,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#300060",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2
  },
  text: {
    color: "white",
    fontFamily: "Comfortaa-Bold"
  }
});