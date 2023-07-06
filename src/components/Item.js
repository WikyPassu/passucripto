import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { formatNumber } from "../utils/functions";

const Item = ({navigation, crypto}) => {
  const { id, image, symbol, perc24h, name, price, pesoPrice } = crypto.item;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CryptoData", {cryptoId: id})}>
      <View style={styles.container}>
        <View style={{width: 45, marginRight: 5}}>
          <Image style={styles.icon} source={{uri: image}}/>
        </View>
        <View style={{width: 140}}>
          <Text style={styles.text}>{symbol}
              <Text style={perc24h.includes("+") ? styles.textPositivePercentage : styles.textNegativePercentage}>
                {" " + perc24h}
              </Text>
          </Text>
          <Text style={styles.subText}>{name}</Text>
        </View>
        <View style={{width: 140}}>
          <Text style={styles.textPrice}>{formatNumber("en-US", "USD", 8, price) + " USD"}</Text>
          <Text style={styles.textSubPrice}>{formatNumber("en-US", "USD", 2, pesoPrice) + " ARS"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#300060"
  },
  icon: {
    width: 45,
    height: 45,
  },
  text: {
    color: "#FFF",
    fontSize: 17,
    fontFamily: "Comfortaa-Bold"
  },
  subText: {
    color: "#BFBFBF",
    fontSize: 15,
    fontFamily: "Comfortaa"
  },
  textPrice: {
    color: "#FFF",
    textAlign: "right",
    fontSize: 17,
    fontFamily: "Comfortaa-Bold"
  },
  textSubPrice: {
    color: "#BFBFBF",
    textAlign: "right",
    fontSize: 15,
    fontFamily: "Comfortaa"
  },
  textPositivePercentage: {
    fontWeight: "normal",
    color: "#00FF00",
    fontFamily: "Comfortaa"
  },
  textNegativePercentage: {
    fontWeight: "normal",
    color: "#FF0000",
    fontFamily: "Comfortaa"
  }
});