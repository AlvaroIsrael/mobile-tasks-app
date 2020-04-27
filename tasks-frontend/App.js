import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import commonStyles from './src/commonStyles';

class App extends Component {
  render() {
    return (
      <View style={css.container}>
        <Text style={css.welcome}> Welcome to react native</Text>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
  welcome: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#A6E22E',
  },
});

export default App;
