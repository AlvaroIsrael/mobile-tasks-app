import {Alert, Platform} from 'react-native';

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

function showError(erro) {
  Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${erro},`);
}

function showSucess(msg) {
  Alert.alert('Sucesso!, msg');
}

export {server, showError, showSucess};
