import React, {useState, Dispatch, SetStateAction, FC} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface IItem {
//   item: string;
//   quantity: string;
// }
interface Props {
  visible: boolean;
  setVisible: () => void;
  getProductList: () => void;
}
const AddProduct: FC<Props> = ({visible, setVisible, getProductList}) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [open, setOpen] = useState(false);
  const [productType, setProductType] = useState(null);
  const [items, setItems] = useState([
    {label: 'Peripheral', value: 'peripheral'},
    {label: 'Integrated', value: 'integrated'},
  ]);

  const addProductClick = async () => {
    if (productName === '') {
      Alert.alert('No Product!', 'You need to enter an Product');
    } else if (productType === null) {
      Alert.alert('No Product Type!', 'You need to enter an Product Type');
    } else if (price === '') {
      Alert.alert('No Price!', 'You need to enter an Price');
    } else {
      if (productType === 'integrated') {
        const getValue: number = +price.replace(/[^0-9]/g, '');
        if (getValue < 1000 || getValue > 2600) {
          Alert.alert(
            'Price warnning',
            'Price must be in between 1000$ to 2600$',
          );
        } else {
          const obj = {
            id:Math.random(),
            productName,
            productType,
            price,
          };
          try {
            const value = await AsyncStorage.getItem('@productList');
            if (value != null) {
              var pList = [];
              pList = JSON.parse(value) || [];
              const checkProduct1 = pList.find(
                (element: any) => element.productName === obj.productName,
              );
              if (checkProduct1 === undefined) {
                pList.push(obj);
                const jsonValue = JSON.stringify(pList);
                AsyncStorage.setItem('@productList', jsonValue);
                getProductList();
                cancelClick();
              } else {
                Alert.alert(
                  'Product Found',
                  'Another product with the same name',
                );
                cancelClick();

              }
              console.log('checkProduct', checkProduct1);
            } else {
              var pList = [];
              pList.push(obj);
              const jsonValue = JSON.stringify(pList);
              AsyncStorage.setItem('@productList', jsonValue);
              getProductList();
              cancelClick();
            }
          } catch (e) {
            console.log('error', e);
            // saving error
          }
        }
      } else {
        const obj = {
          productName,
          productType,
          price,
        };
        try {
          const value = await AsyncStorage.getItem('@productList');
          if (value != null) {
            console.log('value', value);
            var pList = [];
            pList = JSON.parse(value) || [];
            const checkProduct1 = pList.find(
              (element: any) => element.productName === obj.productName,
            );
            if (checkProduct1 === undefined) {
              pList.push(obj);
              const jsonValue = JSON.stringify(pList);
              AsyncStorage.setItem('@productList', jsonValue);
              getProductList();
              cancelClick();
            } else {
              Alert.alert(
                'Product Found',
                'Another product with the same name',
              );
              cancelClick();

            }
            console.log('checkProduct', checkProduct1);
          } else {
            var pList = [];
            pList.push(obj);
            const jsonValue = JSON.stringify(pList);
            AsyncStorage.setItem('@productList', jsonValue);
            getProductList();
            cancelClick();
          }
        } catch (e) {
          console.log('error', e);
        }
      }
    }
  };

  const cancelClick = () => {
    setPrice('')
    setProductName('')
    setProductType(null)
    setVisible();

  };

  const setPriceFun = (text: string) => {
    if (productType == null) {
      Alert.alert('please select produc type');
    } else {
      if (productType === 'peripheral') {
        const getValue = text.replace(/[^0-9]/g, '');

        setPrice(getValue);
        console.log('getValue', getValue);
      } else {
        const getValue = text.replace(/[^0-9]/g, '');
        console.log('getValue', getValue);
        setPrice(getValue.toString());
      }
    }
  };

  return (
    <Modal isVisible={visible} style={{margin: 0}}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Create New Product</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={text => setProductName(text)}
              placeholderTextColor="gray"
            />

            <DropDownPicker
              placeholderStyle={{
                color: 'grey',
              }}
              placeholder="Product type"
              open={open}
              value={productType}
              items={items}
              setOpen={setOpen}
              setValue={setProductType}
              setItems={setItems}
              style={styles.input}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={text => {
                setPriceFun(text);
              }}
              placeholderTextColor="gray"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.addItemButton} onPress={addProductClick}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelItemButton}
                onPress={cancelClick}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  headingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: '700',
  },
  form: {
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  input: {
    padding: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color:"black"
  },
  addItemButton: {
    backgroundColor: 'green',
    paddingVertical: 20,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },

  cancelItemButton: {
    backgroundColor: 'gray',
    paddingVertical: 20,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 20, fontWeight: '700'},
});
export default AddProduct;
