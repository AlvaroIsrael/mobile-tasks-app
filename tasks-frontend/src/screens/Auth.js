import React, {Component} from 'react';
import {ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, Alert} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import {server, showError, showSucess} from '../common';
import axios from 'axios';

export default class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
  };

  signInOrSignOut = () => {
    if (this.state.stageNew) {
      this.signUp();
    } else {
      Alert.alert('Sucesso!', 'Logar');
    }
  };

  signUp = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      });
      showSucess('Usuario cadastrado.');
      this.setState({stageNew: false});
    } catch (e) {
      showError(e);
    }
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={css.background}>
        <Text style={css.title}>Tasks</Text>
        <View style={css.formContainer}>
          <Text style={css.subtitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados!'}</Text>
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              style={css.input}
              onChangeText={(name) => this.setState({name: name})}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            style={css.input}
            onChangeText={(email) => this.setState({email: email})}
          />
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            style={css.input}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password: password})}
          />
          {this.state.stageNew && (
            <AuthInput
              icon="asterisk"
              placeholder="Confirmação de Senha"
              value={this.state.confirmPassword}
              style={css.input}
              onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
            />
          )}
          <TouchableOpacity onPress={this.signInOrSignOut}>
            <View style={css.button}>
              <Text style={css.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={css.espaco} onPress={() => this.setState({stageNew: !this.state.stageNew})}>
          <Text style={css.buttonText}>{this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const css = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
    //padding: Platform.OS === 'ios' ? 15 : 10,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
  },
  espaco: {
    padding: 10,
  },
});
