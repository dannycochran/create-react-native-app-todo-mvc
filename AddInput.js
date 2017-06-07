import React from 'react';

import {
  View,
  TextInput
} from 'react-native';

import styles, { shadowProps } from './styles';

export default class AddInput extends React.Component {
  render() {
    return (
      <View {...shadowProps} style={styles.inputContainer}>
        <TextInput {...shadowProps} style={this.props.input.length > 0 ? styles.textInputFocused : styles.textInput}
          onFocus={() => this.props.onFocus(true)}
          onBlur={() => this.props.onFocus(false)}
          placeholder={'What needs to be done?'}
          value={this.props.input}
          onChangeText={this.props.onInput} />
      </View>
    );
  }
}
