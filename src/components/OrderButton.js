import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const OrderButton = ({text, order, icon, handleSortOrder}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handleSortOrder(order)}>
      <Text style={styles.text}>{text}</Text>
      <Icon name={icon} size={30} color="white" />
    </TouchableOpacity>
  );
};

export default OrderButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2
  },
  text: {
    margin: 5,
    fontSize: 15,
    color: "#fff",
    fontFamily: "Comfortaa-Bold"
  }
});