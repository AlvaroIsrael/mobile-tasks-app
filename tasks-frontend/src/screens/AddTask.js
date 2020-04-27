import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  DatePickerAndroid,
  Platform,
} from 'react-native';

import commonStyles from '../commonStyles';
import moment from 'moment';

const initialState = {desc: '', date: new Date()};

export default class AddTask extends Component {
  state = {...initialState};

  save = () => {
    if (!this.state.desc.trim()) {
      Alert.alert('Dados invalidos!', 'Informe uma descriccao para tarefa.');
      return;
    }
    const data = {...this.state};
    this.props.onSave(data);
    this.setState({...initialState});
  };

  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.date,
    }).then((e) => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date);
        momentDate.date(e.day);
        momentDate.month(e.month);
        momentDate.year(e.year);
        this.setState({date: momentDate.toDate()});
      }
    });
  };

  render() {
    let datePicker = null;
    if (Platform.OS === 'ios') {
      datePicker = (
        <DatePickerIOS mode="date" date={this.state.date} onDateChange={(date) => this.setState({date})}/>
      );
    } else {
      datePicker = (
        <TouchableOpacity onPress={this.handleDateAndroidChanged}>
          <Text style={css.date}>{moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <Modal
        onRequestClose={this.props.onCancel}
        visible={this.props.isVisible}
        animationType="slide"
        transparent={true}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={css.offset}/>
        </TouchableWithoutFeedback>
        <View style={css.container}>
          <Text style={css.header}>Nova Tarefa</Text>
          <TextInput
            placeholder="Descrição..."
            style={css.input}
            onChangeText={(desc) => this.setState({desc})}
            values={this.state.desc}
          />
          {datePicker}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={css.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={css.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={css.offset}/>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const css = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  offset: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.default,
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.color.default,
    color: commonStyles.color.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});
