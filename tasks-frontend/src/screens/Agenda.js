import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import AddTask from './AddTask';
import AsyncStorage from '@react-native-community/async-storage';

export default class Agenda extends Component {
  state = {
    /*tasks: [
        { id: Math.random(), desc: 'Compra maroto', estimateAt: new Date(), doneAt: null },
        { id: Math.random(), desc: 'Concluir o curso', estimateAt: new Date(), doneAt: new Date() },
      ],*/
    tasks: [],
    visibleTasks: [],
    showDoneTasks: true,
    showAddTask: false,
  };

  addTask = (task) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: task.desc,
      estimateAt: task.date,
      doneAt: null,
    });
    this.setState({tasks, showAddTask: false}, this.filterTasks);
  };

  deleteTask = (id) => {
    const tasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({tasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = (task) => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({visibleTasks});
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  };

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  async componentDidMount(): void {
    const data = await AsyncStorage.getItem('tasks');
    const tasks = JSON.parse(data) || [];
    this.setState({tasks}, this.setState);
    this.filterTasks();
  }

  toogleTask = (id) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    this.setState({tasks}, this.filterTasks);
  };

  render() {
    return (
      <View style={css.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onSave={this.addTask}
          onCancel={() => this.setState({showAddTask: false})}
        />
        <ImageBackground source={todayImage} style={css.background}>
          <View style={css.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.color.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={css.titleBar}>
            <Text style={css.title}>Hoje</Text>
            <Text style={css.subtitle}>
              {moment()
                .locale('pt-br')
                .format('ddd, D [de] MMMM')}
            </Text>
          </View>
        </ImageBackground>
        <View style={css.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <Task {...item} toogleTask={this.toogleTask} onDelete={this.deleteTask}/>}/>
        </View>
        <ActionButton
          buttonColor={commonStyles.color.today}
          onPress={() => {
            this.setState({showAddTask: true});
          }}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskContainer: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
