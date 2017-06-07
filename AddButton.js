import React from 'react';

import {
  Text,
  TouchableHighlight
} from 'react-native';

import styles, { buttonUnderlay } from './styles';

export default class AddButton extends React.Component {
  render() {
    return (
      <TouchableHighlight style={styles.addButton}
        onPress={this.props.addTodo}
        underlayColor={buttonUnderlay}>
        <Text style={styles.addText}>Add Todo</Text>
      </TouchableHighlight>
    );
  }
}
