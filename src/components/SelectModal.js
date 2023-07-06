import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const SIZE = Dimensions.get('window').height;

const SelectModal = ({modalVisible, setModalVisible, cryptos, currentButton, currentSymbols, handleOnChangeCrypto}) => {
  const {first, second} = currentSymbols;
  const activeSymbol = !currentButton ? first : second;

  const Crypto = ({crypto}) => {
    const {image, symbol} = crypto;
    return (
      <TouchableOpacity
        style={styles.crypto}
        onPress={() => handleOnChangeCrypto(currentButton, crypto)}
      >
        <Image style={styles.icon} source={symbol != "ARS" && symbol != "USD" ? {uri: image} : image}/>
        <Text style={styles.text}>{symbol}</Text>
      </TouchableOpacity>
    );
  };

  return (
    cryptos.length > 0 ?
    <Modal
      style={styles.bottomModal}
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalContent}>
      <View style={{margin: 15}}>
      <Text style={styles.text}>Seleccionar cripto</Text>
      </View>
      <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
          {
            cryptos.filter(c => c.symbol != activeSymbol)
            .map((c, index) => <Crypto key={index} crypto={c} />)
          }
        </ScrollView>
      </View>
    </Modal> : null
  );
};

export default SelectModal;

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    height: SIZE / 2,
    backgroundColor: '#300060',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Comfortaa-Bold',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 8
  },
  crypto: {
    margin: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2
  }
});