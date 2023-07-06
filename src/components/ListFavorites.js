import React, {useState, useRef, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getCryptosById, sort } from '../utils/functions';
import HeaderFavorites from './HeaderFavorites';
import Item from './Item';
import Spinner from './Spinner';
import OrderModal from './OrderModal';

const ListFavorites = ({navigation}) => {
  const [cryptos, setCryptos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('marketCapDesc');
  const [favorites, setFavorites] = useState(true);
  const flatListRef = useRef();

  useFocusEffect(useCallback(() => {
    getFavoriteCryptos();
    const interval = setInterval(() => {
      getFavoriteCryptos();
    }, 30000);
    return () => clearInterval(interval);
  }, [currentOrder]));

  const getFavoriteCryptos = async () => {
    let storage = await AsyncStorage.getItem("favorites");
    storage = !storage ? [] : JSON.parse(storage);
    if(storage.length > 0){
      let ids = "";
      for(let i=0; i<storage.length; i++){
        ids += storage[i] + ",";
      }
      ids = ids.substring(0, ids.length-1);
      const data = await getCryptosById(ids);
      setCryptos(sort(currentOrder, data));
      console.log(new Date().toLocaleTimeString() + ' -> Actualizadas Favoritas');
    }
    else{
      setFavorites(false);
      setCryptos([]);
    }
  };

  const handleSortOrder = order => {
    setCurrentOrder(order);
    setModalVisible(false);
    setCryptos(sort(order, cryptos));
    flatListRef.current.scrollToOffset({animated: false, offset: 0});
  };

  const header = (title, setModalVisible) => {
    return (
      <HeaderFavorites
        title={title}
        setModalVisible={setModalVisible}
      />
    );
  };

  const renderItem = crypto => <Item navigation={navigation} crypto={crypto} />;

  return (
    <View style={{flexGrow: 1}}>
      <FlatList
        ref={flatListRef}
        style={{marginBottom: 75, backgroundColor: '#220035'}}
        data={cryptos}
        renderItem={renderItem}
        keyExtractor={(crypto, index) => crypto.id + index}
        extraData={cryptos}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={header(
          'Tus criptos favoritas',
          setModalVisible
        )}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          !favorites ? 
          <View style={styles.centered}>
            <Text style={styles.text}>Todavía no tenés criptos favoritas</Text>
          </View> : <View style={styles.centered}><Spinner /></View>
        }
      />
      <OrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSortOrder={handleSortOrder}
      />
    </View>
  );
};

export default ListFavorites;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Comfortaa-Bold"
  }
});
