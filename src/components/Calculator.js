import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { TextInput } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import {getMarketData, sort, formatNumber} from '../utils/functions';
import { getDolarQuote } from '../services/api-dolar';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCalculator from './HeaderCalculator';
import CryptoButton from './CryptoButton';
import SelectModal from './SelectModal';

const SIZE = Dimensions.get('window').width;
const SIZE_INPUT = SIZE / 2.25;
const SIZE_TEXT = SIZE / 1.5;
const emptyCrypto = {image: null, symbol: null};

const Calculator = () => {
  const [cryptos, setCryptos] = useState([]);
  const [firstCrypto, setFirstCrypto] = useState(emptyCrypto);
  const [secondCrypto, setSecondCrypto] = useState(emptyCrypto);
  const [firstQty, setFirstQty] = useState("0");
  const [secondQty, setSecondQty] = useState("0");
  const [showFirstQty, setShowFirstQty] = useState("0");
  const [showSecondQty, setShowSecondQty] = useState("0");
  const [firstSize, setFirstSize] = useState(25);
  const [secondSize, setSecondSize] = useState(25);
  const [firstWidthRatio, setFirstWidthRatio] = useState(firstQty.length / SIZE_TEXT);
  const [secondWidthRatio, setSecondWidthRatio] = useState(secondQty.length / SIZE_TEXT);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentButton, setCurrentButton] = useState();

  useFocusEffect(useCallback(() => {
    setFirstWidthRatio(SIZE_TEXT / Math.max(firstQty.length, 1));
  }, [firstQty]));

  useFocusEffect(useCallback(() => {
    setSecondWidthRatio(SIZE_TEXT / Math.max(secondQty.length, 1));
  }, [secondQty]));

  useFocusEffect(useCallback(() => {
    const size = Math.max(Math.min(firstWidthRatio, 25), 5);
    setFirstSize(size);
  }, [firstQty, firstWidthRatio]));

  useFocusEffect(useCallback(() => {
    const size = Math.max(Math.min(secondWidthRatio, 25), 5);
    setSecondSize(size);
  }, [secondQty, secondWidthRatio]));

  useFocusEffect(useCallback(() => {
    getCryptos();
  }, []));

  const getCryptos = async () => {
    let data = await getMarketData();
    const dolarQuote = await getDolarQuote();
    const USD = {
      image: require("../assets/usd.png"),
      symbol: "USD",
      price: 1
    };
    const ARS = {
      image: require("../assets/ars.png"),
      symbol: "ARS",
      price: 1 / dolarQuote
    };
    data = sort("symbolDesc", data);
    data.unshift(USD, ARS);
    setCryptos(data);
    console.log(new Date().toLocaleTimeString() + ' -> Actualizadas Conversor');
  };

  const handleOnChangeCrypto = (currentButton, crypto) => {
    setModalVisible(false);
    if(crypto.symbol == firstCrypto.symbol || crypto.symbol == secondCrypto.symbol){
      handleSwap();
    }
    else{
      !currentButton ? setFirstCrypto(crypto) : setSecondCrypto(crypto);
    }
  };

  const handleOnChangeQty = (index, text) => {
    let newText = "";
    for(let i=0; i<text.length; i++){
      if(text[i] != "."){
        newText += text[i];
      }
    }
    if(!newText){
      setFirstQty("0");
      setSecondQty("0");
    }
    else if(newText.match(/^([0-9]{1,})?(\,)?([0-9]{1,})?$/)){
      let number = newText;
      if(number.length > 1 && number[0] == 0 && number[1] != ","){
        number = number.substring(1);
      }
      let splitted;
      let firstPart;
      let secondPart;
      let newNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if(number.includes(",")){
        splitted = number.split(",");
        firstPart = splitted[0];
        secondPart = splitted[1];
        newNumber = firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "," + secondPart;
      }
      let showNumber = newNumber;
      if(showNumber[showNumber.length-1] == ','){
        showNumber = showNumber.substring(0, showNumber.length-1);
      }
      if(!index){
        setFirstQty(newNumber);
        setShowFirstQty(showNumber);
        newNumber = parseFloat(number.replace(",", "."));
        showNumber = parseFloat(number.replace(",", "."));
        if(secondCrypto.symbol){
          const result = (newNumber * firstCrypto.price) / secondCrypto.price;
          const showResult = (showNumber * firstCrypto.price) / secondCrypto.price;
          setSecondQty(formatNumber("en-US", "USD", 8, result));
          setShowSecondQty(formatNumber("en-US", "USD", 8, showResult));
        }
      }
      else{
        setSecondQty(newNumber);
        setShowSecondQty(showNumber);
        newNumber = parseFloat(number.replace(",", "."));
        showNumber = parseFloat(number.replace(",", "."));
        if(firstCrypto.symbol){
          const result = (newNumber * secondCrypto.price) / firstCrypto.price;
          const showResult = (showNumber * secondCrypto.price) / firstCrypto.price;
          setFirstQty(formatNumber("en-US", "USD", 8, result));
          setShowFirstQty(formatNumber("en-US", "USD", 8, showResult));
        }
      }
    }
  };
  
  const handleSwap = () => {
    let auxCrypto = firstCrypto;
    setFirstCrypto(secondCrypto);
    setSecondCrypto(auxCrypto);
    let auxQty = firstQty;
    setFirstQty(secondQty);
    setSecondQty(auxQty);
    let auxShowQty = showFirstQty;
    setShowFirstQty(showSecondQty);
    setShowSecondQty(auxShowQty);
  };

  return (
    <View>
      <HeaderCalculator title={"Conversor de criptos"} />
      <View style={styles.body}>
        <CryptoButton
          image={firstCrypto.image}
          symbol={firstCrypto.symbol}
          setModalVisible={setModalVisible}
          currentButton={0}
          setCurrentButton={setCurrentButton}  
        />
        <View style={{borderRadius: 50, borderColor: "white", borderWidth: 2, backgroundColor: "#300060"}}>
          <TextInput
            style={[styles.textInput, {fontSize: firstSize}]}
            mode="flat"
            keyboardType='numeric'
            value={firstQty}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            selectionColor="white"
            selection={{start: firstQty.length, end: firstQty.length}}
            theme={{
              colors:{text: "white", placeholder: "#c9c9c9"},
              fonts: { regular: {fontWeight: "normal", fontFamily: "Comfortaa-Bold"}}
            }}
            onChangeText={text => handleOnChangeQty(0, text)}
          />
        </View>
      </View>
      <View style={{alignItems:'center', justifyContent: "center"}}>
        <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
          <Icon name="swap-vertical" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <CryptoButton
          image={secondCrypto.image}
          symbol={secondCrypto.symbol}
          setModalVisible={setModalVisible}
          currentButton={1}
          setCurrentButton={setCurrentButton}
        />
        <View style={{borderRadius: 50, borderColor: "white", borderWidth: 2, backgroundColor: "#300060"}}>
          <TextInput
            style={[styles.textInput, {fontSize: secondSize}]}
            mode="flat"
            keyboardType='numeric'
            value={secondQty}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            selectionColor="white"
            selection={{start: secondQty.length, end: secondQty.length}}
            theme={{
              colors:{text: "white", placeholder: "#c9c9c9"},
              fonts: { regular: {fontWeight: "normal", fontFamily: "Comfortaa-Bold"}}
            }}
            onChangeText={text => handleOnChangeQty(1, text)}
          />
        </View>
      </View>
      {
        (firstCrypto.symbol != null && secondCrypto.symbol != null && firstQty != "0" && secondQty != "0") ?
        (<View style={{padding: 25, alignItems:'center', justifyContent: "center"}}>
          <Text style={styles.textInfo}>
            {
              `${showFirstQty} ${firstCrypto.symbol} equivalen aprox. a ${showSecondQty} ${secondCrypto.symbol}`
            }
          </Text>
        </View>) : null
      }
      <SelectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cryptos={cryptos}
        currentButton={currentButton}
        currentSymbols={{first: firstCrypto.symbol, second: secondCrypto.symbol}}
        handleOnChangeCrypto={handleOnChangeCrypto}
      />
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  body: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 25,
    color: "white",
    fontFamily: "Comfortaa-Bold"
  },
  textInput: {
    width: SIZE_INPUT,
    height: 75,
    color: "white",
    textAlign: "right",
    backgroundColor: "transparent"
  },
  swapButton: {
    width: 65,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#300060",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2
  },
  textInfo: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Comfortaa-Bold"
  }
});