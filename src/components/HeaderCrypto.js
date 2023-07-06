import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderCrypto = ({navigation, crypto}) => {
  const {id, symbol, name} = crypto;
  const [heart, setHeart] = useState(false);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if(first){
      setFirst(false);
      handleLocalStorage(true);
      return;
    }
    handleLocalStorage(false);
  }, [heart]);

  const handleLocalStorage = async firstSpin => {
    let favorites = await AsyncStorage.getItem("favorites");
    favorites = !favorites ? [] : JSON.parse(favorites);
    if(firstSpin){
      if(favorites.includes(id)){
        setHeart(true);
        return;
      }
    }
    else{
      if(heart){
        if(favorites.includes(id)){
          return;
        }
        favorites.push(id);
      }
      else{
        favorites = favorites.filter(c => c != id);
      }
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View style={{alignItems: "center"}}>
        <Text style={styles.text}>{symbol}</Text>
        <Text style={styles.subText}>{name}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => setHeart(!heart)}>
        <Icon
          name={heart ? "heart" : "heart-outline"}
          size={35}
          color={heart ? "red" : "white"} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCrypto;

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
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Comfortaa-Bold"
  },
  subText: {
    color: "#BFBFBF",
    fontSize: 18,
    fontFamily: "Comfortaa"
  }
});
