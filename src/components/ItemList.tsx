import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  index: number;
  productName: string;
  productType: string;
  price: number;
  getProductList: () => void;
}

const ItemList: React.FC<Props> = ({
  index,
  productName,
  productType,
  price,
  getProductList,
}) => {
  const deleteProduct = async () => {
    const values = await AsyncStorage.getItem('@productList');
    if (values != null) {
      const pList = [JSON.parse(values)];
      pList.splice(index, 1);
      const jsonValue = JSON.stringify(pList);

      AsyncStorage.setItem('@productList', jsonValue);
      getProductList();
    }
  };

  const rightSwipeActions = () => {
    return (
      <TouchableHighlight
        onPress={() => {
          deleteProduct();
        }}
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}>
          Delete
        </Text>
      </TouchableHighlight>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <View style={styles.item}>
        <Text style={styles.itemName}>{productName}</Text>
        <Text style={styles.itemName}>{productType}</Text>
        <Text style={styles.quantity}>{price}</Text>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  itemName: {
    fontWeight: '500',
    color: 'black',
  },
  quantity: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: 'black',
  },
});
export default ItemList;
