import {View, StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';

export default function Switch({active, onPress, disabled}) {
  return (
    <TouchableHighlight
      underlayColor={'transparent'}
      style={{opacity: disabled ? 0.8 : 1}}
      onPress={disabled ? null : onPress}>
      <View style={styles.switchCon}>
        <View
          style={[
            styles.switch,
            {
              backgroundColor: !active ? '#777' : '#6c64ff',
              marginLeft: !active ? 3 : 17,
            },
          ]}
        />
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  switchCon: {
    height: 20,
    width: 35,
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  switch: {
    height: 12,
    width: 12,
    borderRadius: 7,
  },
});
