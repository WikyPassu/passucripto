import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderList = ({title, setModalVisible}) => {
  return (
    <View style={styles.header}>
      <View style={{width: "auto", flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.text}>{title}</Text>
        <Icon name="heart" size={30} color="red" style={{marginLeft: 10}} />
      </View>
      <View style={{width: "auto", flexDirection: "row"}}>
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="options" size={30} color="white" />
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