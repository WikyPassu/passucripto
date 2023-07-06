import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, FlatList } from "react-native";
import {filter, sort} from "../utils/functions";
import HeaderSearch from './HeaderSearch';
import Item from "./Item";
import OrderModal from './OrderModal';

const ListSearch = ({navigation, route}) => {
  const { cryptos } = route.params;
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [textResult, setTextResult] = useState("Utilizá el buscador para empezar a filtrar criptos");
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef();

  const handleOnChangeText = text => {
    if(text){ 
      const upperText = text.toUpperCase();
      const newData = filter(crypto => crypto.symbol.includes(upperText) || crypto.name.toUpperCase().includes(upperText), cryptos);
      setFilteredCryptos(newData);
      if(!newData.length){
        setTextResult(`No se encontraron resultados para: "${text}"`);
      }
      setTextSearch(text);
    }
    else{
      setFilteredCryptos([]);
      setTextResult("Utilizá el buscador para empezar a filtrar criptos");
      setTextSearch(text);
    }
  };

  const handleOnPressCancel = () => {
    setFilteredCryptos([]);
    setTextResult("Utilizá el buscador para empezar a filtrar criptos");
    setTextSearch("");
  };

  const handleSortOrder = order => {
    setModalVisible(false);
    setFilteredCryptos(sort(order, filteredCryptos));
    flatListRef.current.scrollToOffset({animated: false, offset: 0});
  };

  const header = (navigation, textSearch, handleOnChangeText, handleOnPressCancel) => {
    return (
      <HeaderSearch
        navigation={navigation}
        textSearch={textSearch}
        handleOnChangeText={handleOnChangeText}
        handleOnPressCancel={handleOnPressCancel}
        setModalVisible={setModalVisible}
      />
    );
  };

  const renderItem = crypto => <Item navigation={navigation} crypto={crypto}/>

  return (
    <View style={{flexGrow: 1}}>
      <FlatList
        ref={flatListRef}
        style={{backgroundColor: "#220035"}}
        data={filteredCryptos}
        renderItem={renderItem}
        keyExtractor={(crypto, index) => crypto.id + index}
        extraData={filteredCryptos}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent=
        {
          header(navigation, textSearch, handleOnChangeText, handleOnPressCancel)
        }
        stickyHeaderIndices={[0]}
        ListEmptyComponent=
        {
          <View style={styles.textResult}>
            <Text style={styles.text}>{textResult}</Text>
          </View>
        }
      />
      <OrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSortOrder={handleSortOrder}
      />
    </View>
  );
}

export default ListSearch;

const styles = StyleSheet.create({
  textResult: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Comfortaa-Bold"
  }
});