import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { getCryptoById, formatNumber } from "../utils/functions";
import Chart from './Chart';
import HeaderCrypto from './HeaderCrypto';
import Spinner from './Spinner';

const SIZE = Dimensions.get('window').height;

const CryptoData = ({navigation, route}) => {
  const { cryptoId } = route.params;
  const [crypto, setCrypto] = useState();
  
  useFocusEffect(useCallback(() => {
    getCrypto(cryptoId);
    const interval = setInterval(() => {
      getCrypto(cryptoId);
    }, 30000);
    return () => clearInterval(interval);
  }, []));

  const getCrypto = async id => {
    const data = await getCryptoById(id);
    setCrypto(data);
    console.log(new Date().toLocaleTimeString() + ' -> Actualizada Cripto');
  };

  const calculatePrecision = () => {
    const {price} = crypto;
    let precision = price.toString().split('.');
    if(precision.length == 2){
      return precision[1].length;
    }
    return 2;
  };

  return (
      !crypto ? 
      <View style={styles.spinner}>
        <Spinner />
      </View> : 
      <View>
        <HeaderCrypto navigation={navigation} crypto={{id: cryptoId, symbol: crypto.symbol, name: crypto.name}}/>
        <View style={styles.container}>
          <View style={styles.iconPrices}>
            <Image style={styles.icon} source={{uri: crypto.image}}/>
            <View>
              <Text style={styles.textPrice}>{formatNumber("en-US", "USD", 8, crypto.price) + " USD"}</Text>
              <Text style={styles.textSubPrice}>{formatNumber("en-US", "USD", 2, crypto.pesoPrice) + " ARS"}</Text>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.infoTitle}>Rank: </Text>
              <Text style={styles.info}>{"#" + crypto.rank}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.infoTitle}>Capitalización: </Text>
              <Text style={styles.info}>{formatNumber("en-US", "USD", 2, crypto.marketCap) + " USD"}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.infoTitle}>Variación 24h: </Text>
              <Text
                style={crypto.perc24h.includes("+") ? styles.textPositivePercentage : styles.textNegativePercentage}
              >{crypto.perc24h}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.infoTitle}>Mayor precio hoy: </Text>
              <Text style={styles.info}>{formatNumber("en-US", "USD", 8, crypto.high) + " USD"}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.infoTitle}>Menor precio hoy: </Text>
              <Text style={styles.info}>{formatNumber("en-US", "USD", 8, crypto.low) + " USD"}</Text>
            </View>
          </View>
        </View>
        <Chart sparkline={crypto.sparkline} precision={calculatePrecision()}/>
      </View>
  );
};

export default CryptoData;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  iconPrices: {
    height: SIZE / 7,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#300060"
  },
  viewInfo: {
    height: SIZE / 6,
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "#300060"
  },
  textPrice: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "right",
    fontFamily: "Comfortaa-Bold"
  },
  textSubPrice: {
    color: "#BFBFBF",
    fontSize: 18,
    textAlign: "right",
    fontFamily: "Comfortaa"
  },
  infoTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Comfortaa-Bold"
  },
  info: {
    color: "#BFBFBF",
    fontSize: 16,
    fontFamily: "Comfortaa"
  },
  textPositivePercentage: {
    color: "#00FF00",
    fontSize: 16,
    fontFamily: "Comfortaa"
  },
  textNegativePercentage: {
    color: "#FF0000",
    fontSize: 16,
    fontFamily: "Comfortaa"
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});