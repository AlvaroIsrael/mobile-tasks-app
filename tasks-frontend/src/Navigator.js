import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';

const mainRoutes = {
  auth: {
    name: 'Auth',
    screen: Auth,
  },
  home: {
    name: 'Home',
    screen: Agenda,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {initialRouteName: 'auth'});

export default createAppContainer(mainNavigator);
