import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';

interface Props {
    setVisible: ()=>void;
  }

const floatingButtonStyle: React.FC<Props> = ({setVisible}) => {
  const clickHandler = () => {
    //function to handle click on floating Action Button
    setVisible()
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={clickHandler}
      style={styles.touchableOpacityStyle}>
      <Image
        source={require('../assets/images/whitePlus.jpeg')}
        style={styles.floatingButtonStyle}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'green',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    //backgroundColor:'black'
  },
});
export default floatingButtonStyle;
