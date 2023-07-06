import React, {useState, useRef, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getMarketData, sort} from '../utils/functions';
import HeaderList from './HeaderList';
import Item from './Item';
import Spinner from './Spinner';
import OrderModal from './OrderModal';

const List = ({navigation}) => {
  const [cryptos, setCryptos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('marketCapDesc');
  const flatListRef = useRef();

  useFocusEffect(useCallback(() => {
    getCryptos();
    const interval = setInterval(() => {
      getCryptos();
    }, 30000);
    return () => clearInterval(interval);
  }, [currentOrder]));

  const getCryptos = async () => {
    const data = await getMarketData();
    setCryptos(sort(currentOrder, data));
    console.log(new Date().toLocaleTimeString() + ' -> Actualizadas Todas');
  };

  const handleSortOrder = order => {
    setCurrentOrder(order);
    setModalVisible(false);
    setCryptos(sort(order, cryptos));
    flatListRef.current.scrollToOffset({animated: false, offset: 0});
  };

  const header = (title, navigation, cryptos, setModalVisible) => {
    return (
      <HeaderList
        title={title}
        navigation={navigation}
        cryptos={cryptos}
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
          'Mercado Cripto',
          navigation,
          cryptos,
          setModalVisible,
        )}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={<View style={styles.spinner}><Spinner /></View>}
      />
      <OrderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSortOrder={handleSortOrder}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
