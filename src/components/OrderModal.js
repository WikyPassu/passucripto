import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { ORDER_BUTTONS } from '../constants/orderButtons';
import OrderButton from './OrderButton';

const OrderModal = ({modalVisible, setModalVisible, handleSortOrder}) => {
  return (
    <Modal
      style={styles.bottomModal}
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.modalContent}>
        <View style={{marginBottom: 15}}>
          <Text style={styles.text}>Ordenar por</Text>
        </View>
        <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
          {
            ORDER_BUTTONS.map((b, index) => {
              return (
                <OrderButton
                  key={index}
                  text={b.text}
                  order={b.order}
                  icon={b.icon}
                  handleSortOrder={handleSortOrder}
                />
              )
            })
          }
        </View>
      </View>
    </Modal>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    padding: 20,
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
});