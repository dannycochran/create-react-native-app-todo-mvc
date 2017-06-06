import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Todo extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
