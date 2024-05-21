import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Toggle({active, disabled}) {
  return (
    <View
      style={[
        styles.toggleCon,
        {borderColor: active ? '#6c64ff' : null, opacity: disabled ? 0.8 : 1},
      ]}>
      <View
        style={[styles.toggle, {backgroundColor: active ? '#6c64ff' : null}]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  toggleCon: {
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  toggle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});
