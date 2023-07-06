import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';

const SIZE = Dimensions.get('window').width;
const HeaderSearch = ({navigation, textSearch, handleOnChangeText, handleOnPressCancel, setModalVisible}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <View style={{borderRadius: 50, borderColor: "white", borderWidth: 2}}>
        <TextInput
          style={styles.textInput}
          mode="flat"
          value={textSearch}
          placeholder="Buscá criptos"
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          selectionColor="white"
          theme={{
            colors:{text: "white", placeholder: "#c9c9c9"},
            fonts: { regular: {fontWeight: "normal", fontFamily: "Comfortaa-Bold"}}
          }}
          left={<TextInput.Icon name="magnify" color="white" />}
          right={
            <TextInput.Icon
              name="close"
              color="white"
              onPress={handleOnPressCancel}
            />
          }
          onChangeText={text => handleOnChangeText(text)}>
        </TextInput>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="options" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSearch;

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
  },
  textInput: {
    width: SIZE / 1.7,
    height: 50,
    color: "white",
    backgroundColor: "transparent"
  }
});