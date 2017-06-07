import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';

import styles, {
  shadowProps,
  buttonUnderlay
} from './styles';

import Todo from './Todo';
import Footer from './Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedTab: 'active',
      scrollEnabled: true,
      editing: false,
      loading: true,
      input: ''
    }
  }

  async storeTodos(todos) {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  }

  async addTodo() {
    const timestamp = Date.now();
    const todos = [
      {
        id: timestamp + this.state.input,
        timestamp,
        completed: false,
        description: this.state.input
      },
      ...this.state.todos
    ];

    await this.storeTodos(todos);
    this.setState({
      todos,
      input: ''
    });
  }

  async fetchTodos() {
    let todos = await AsyncStorage.getItem('todos');
    todos = JSON.parse(todos) || [];
    this.setState(prevState => ({
      ...prevState,
      loading: false,
      todos
    }));
  }

  onChangeTab(selectedTab) {
    this.setState({ selectedTab });
  }

  onDragTodo(callback) {
    this.setState({ scrollEnabled: false });
  }

  async onReleaseTodo(todoId, config) {
    this.scrollView.scrollTo({ y: 0, animate: true });
    const todoIndex = this.state.todos.findIndex(t => t.id === todoId);
    const todos = [ ...this.state.todos ];

    if (config.remove) {
      todos.splice(todoIndex, 1);
    } else if (config.complete) {
      todos[todoIndex].completed = true;
    }

    await this.storeTodos(todos);
    this.setState({ scrollEnabled: true, todos });
  }

  renderInput() {
    return (
      <View {...shadowProps} style={styles.inputContainer}>
        <TextInput {...shadowProps} style={this.state.input.length > 0 ? styles.textInputFocused : styles.textInput}
          onFocus={() => this.setState({ editing: true })}
          onBlur={() => this.setState({ editing: false })}
          placeholder={'What needs to be done?'}
          value={this.state.input}
          onChangeText={(input) => this.setState({ input })} />
      </View>
    );
  }

  renderAddButton() {
    if (!this.state.editing) {
      return;
    }

    return (
      <TouchableHighlight style={styles.addButton}
        onPress={this.addTodo.bind(this)}
        underlayColor={buttonUnderlay}>
        <Text style={styles.addText}>Add Todo</Text>
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
    
    const todoHandlers = {
      onDragTodo: this.onDragTodo.bind(this),
      onReleaseTodo: this.onReleaseTodo.bind(this)
    };

    const todos = this.state.todos.filter(todo => {
      return this.state.selectedTab === 'active' ? todo.completed === false : todo.completed === true;
    });

    return (
      <View style={styles.appContainer}>
        <KeyboardAvoidingView style={styles.appWrapper} behavior='padding'>
          <Text style={styles.headerText}>todos</Text>
          {this.renderInput()}
          <View style={styles.scrollContainer}>
            <ScrollView ref={(ref) => this.scrollView = ref}
              style={{flex: 1}} scrollEnabled={this.state.scrollEnabled}>
              {todos.map(t => <Todo {...t} key={t.id} {...todoHandlers} />)}
            </ScrollView>
          </View>
          {this.renderAddButton()}
        </KeyboardAvoidingView>
        <Footer onChangeTab={this.onChangeTab.bind(this)} selectedTab={this.state.selectedTab} />
      </View>
    );
  }
}
