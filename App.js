import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';

import Todo from './Todo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      editing: false,
      loading: true,
      input: ''
    }
  }

  async addTodo() {
    const todos = [
      {
        timestamp: Date.now(),
        completed: false,
        description: this.state.input
      },
      ...this.state.todos
    ];

    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    this.setState({
      todos,
      input: '',
      editing: false
    });
  }

  fetchTodos() {
    AsyncStorage.getItem('todos', (todos) => {
      todos = JSON.parse(todos) || [];
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        todos
      }));
    });
  }

  renderInput() {
    return (
      <View {...shadowProps} style={styles.inputContainer}>
        <TextInput {...shadowProps} style={styles.textInput}
          onFocus={() => this.setState({ editing: true })}
          onBlur={() => this.setState({ editing: false })}
          placeholder={'What needs to be done?'}
          onChangeText={(input) => this.setState({ input })} />
      </View>
    );
  }

  renderAddButton() {
    if (!this.state.editing) {
      return;
    }

    return (
      <TouchableHighlight style={styles.addButton}>
        <Text>Add Todo</Text>
      </TouchableHighlight>
    );
  }

  componentDidMount() {
    this.fetchTodos();
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator style={styles.centered} animating={true} size='large'/>;
    }

    return (
      <KeyboardAvoidingView style={styles.appContainer} behavior='padding'>
        <Text style={styles.headerText}>todos</Text>
        <ScrollView>
          <View style={styles.scrollContainer}>
            {this.renderInput()}
            {this.state.todos.map(t => <Todo {...t} key={t.timestamp + t.description} />)}
          </View>
        </ScrollView>
        {this.renderAddButton()}
      </KeyboardAvoidingView>
    );
  }
}

const shadowProps = {
  shadowColor: 'black',
  shadowOpacity: 0.2,
  shadowOffset: {
    height: 5
  },
  shadowRadius: 6
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: 20
  },

  addButton: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'green'
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 100,
    fontWeight: '100',
    color: 'rgba(175, 47, 47, 0.15)',
    textAlign: 'center'
  },

  inputContainer: {
    flex: 1,
    height: 60,
    elevation: 4,
    flexDirection: 'row',
    marginTop: 5
  }, 

  textInput: {
    flex: 1,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
