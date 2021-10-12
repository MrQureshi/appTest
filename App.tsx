import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Text,
} from 'react-native';
import Header from './src/components/Header';
import FloatingButtonStyle from './src/components/FloatingButton';
// import AddItem, {IItem} from './src/components/AddItem';
import AddItem from './src/components/AddProduct';
import ItemList from './src/components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // const [shoppingList, setShoppingList] = useState<IItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [productList, setProductList] = useState([] as any);
  const toggleModal = () => {
    setVisible(!visible);
  };

  const getProductList = async () => {
    try {
      const value = await AsyncStorage.getItem('@productList');
      if (value !== null) {
        console.log('AsyncStorage values', value);

        var getList = JSON.parse(value) || [];
        setProductList(getList);
        // value previously stored
      } else {
        setProductList([]);

        console.log('list no found');
      }
    } catch (e) {
      // error reading value
    }
  };
  console.log('productList', productList);

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Item" />
      <View style={styles.contentWrapper}>
        <AddItem
          visible={visible}
          setVisible={toggleModal}
          getProductList={getProductList}
        />
        <FlatList
          data={productList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item, index}) => (
            <ItemList
              productName={item.productName}
              productType={item.productType}
              price={item.price}
              index={index}
              getProductList={getProductList}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyListStyle}>
              <Text style={styles.textStyle}>
                You do not have any product.Press the green button below to add
                a new one
              </Text>
            </View>
          }
        />
      </View>
      <FloatingButtonStyle setVisible={toggleModal} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e7e3',
  },
  contentWrapper: {
    padding: 20,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    color: 'black',
  },
  emptyListStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
