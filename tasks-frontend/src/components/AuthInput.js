import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => {
  return (
    <View styles={[css.container, props.container]}>
      <Icon name={props.icon} size={20} style={css.icon} />
      <TextInput {...props} style={css.input} />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: '3%',
    marginTop: '7%',
    color: '#fff',
    position: 'absolute',
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    marginLeft: 50,
    width: '85%',
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: '#fff',
  },
});
