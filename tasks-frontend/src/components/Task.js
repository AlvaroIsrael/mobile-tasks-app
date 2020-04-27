import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';
import Swipeable from 'react-native-swipeable';

export default (props) => {
  const descStyle = props.doneAt !== null ? {textDecorationLine: 'line-through'} : {};

  let check;
  if (props.doneAt !== null) {
    check = (
      <View style={css.done}>
        <Icon name="check" size={20} color={commonStyles.color.secondary} />
      </View>
    );
  } else {
    check = <View style={css.pending} />;
  }

  const leftContent = (
    <View style={css.exclude}>
      <Icon name="trash" size={20} color="#FFF" />
      <Text style={css.excludeText}>Excluir</Text>
    </View>
  );

  const rightContent = [
    <TouchableOpacity
      style={[css.exclude, {justifyContent: 'flex-start', paddingLeft: 20}]}
      onPress={() => props.onDelete(props.id)}>
      <Icon name="trash" size={30} color="#FFF" />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable
      leftActionActivationDistance={200}
      onLeftActionActivate={() => {
        props.onDelete(props.id);
      }}
      leftContent={leftContent}
      rightButtons={rightContent}>
      <View style={css.container}>
        <TouchableWithoutFeedback onPress={() => props.toogleTask(props.id)}>
          <View style={css.checkContainer}>{check}</View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[css.description, descStyle]}>{props.desc}</Text>
          <Text style={css.date}>
            {moment(props.estimateAt)
              .locale('pt-br')
              .format('ddd, D [de] MMMM [de] YYYY')}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const css = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#AAA',
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.subText,
    fontSize: 12,
  },
  exclude: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },
});
