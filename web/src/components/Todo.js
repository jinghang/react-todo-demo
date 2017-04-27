import React from 'react'
const ReactMotion = require('../lib/react-motion.js')
import '../style/Todo.css';
var TransitionMotion = ReactMotion.TransitionMotion;
var spring = ReactMotion.spring;
var presets  = ReactMotion.presets;


const Todo = React.createClass({
  getInitialState() {
    return {
      todos: {
        // key is creation date
        't1': {text: 'Board the plane'},
        't2': {text: 'Sleep'},
        't3': {text: 'Try to finish coneference slides'},
        't4': {text: 'Eat cheese and drink wine'},
        't5': {text: 'Go around in Uber'},
        't6': {text: 'Talk with conf attendees'},
        't7': {text: 'Show Demo 1'},
        't8': {text: 'Show Demo 2'},
        't9': {text: 'Lament about the state of animation'},
        't10': {text: 'Show Secret Demo'},
        't11': {text: 'Go home'},
      },
      value: '',
    };
  },

  // logic from todo, unrelated to animation
  handleChange({target: {value}}) {
    this.setState({value});
  },

  handleSubmit(e) {
    e.preventDefault();
    const {todos, value} = this.state;

    let t = { ['t' + Date.now()]: {text: value},}
    for(const key in todos){
      t[key]=todos[key]
    }

    this.setState({
      todos: t,
    });
  },
  
  handleDestroy(date) {
    const {todos} = this.state;
    delete todos[date];
    this.forceUpdate();
  },

  // actual animation-related logic
  getDefaultValue() {
    const {todos} = this.state;
    return Object.keys(todos)
      .reduce((configs, date) => {
        configs[date] = {
          height: spring(0),
          opacity: spring(1),
          data: todos[date],
        };
        return configs;
      }, {});
  },

  getEndValue() {
    const {todos, value} = this.state;
    return Object.keys(todos)
      .filter(date => {
        const todo = todos[date];
        return todo.text.toUpperCase().indexOf(value.toUpperCase()) >= 0
      })
      .reduce((configs, date) => {
        configs[date] = {
          height: spring(60, presets.wobbly),
          opacity: spring(1, presets.wobbly),
          data: todos[date],
        };
        return configs;
      }, {});
  },

  willEnter(date) {
    return {
      height: spring(0),
      opacity: spring(2),
      data: this.state.todos[date],
    };
  },

  willLeave(date, keyThatJustLeft) {
    return {
      height: spring(0),    //mounting process
      opacity: spring(10),
      data: keyThatJustLeft.data,
    };
  },

  render() {
    const {todos, value} = this.state;
    return (
      <section className="todoapp" style={{maxWidth:'550px'}}>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus={true}
              className="new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <section className="main"  style={{maxWidth:'550px'}}>
          <input className="toggle-all" type="checkbox" onChange={this.handleToggleAll} />
          <TransitionMotion defaultStyles={this.getDefaultValue()} styles={this.getEndValue()} willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {configs =>
              <ul className="todo-list">
                {Object.keys(configs).map(date => {
                  const config = configs[date];
                  //debugger;
                  //console.log('config'+config)
                  const {data: {text}, height,opacity} = config;
                  //const style={height,opacity}
                  return (
                    <li key={date} style={{height,opacity}}>
                      <div className="view">
                        
                        <label>{text}</label>
                        <button
                          className="destroy"
                          onClick={this.handleDestroy.bind(null, date)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            }
          </TransitionMotion>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {Object.keys(todos).filter(key => !todos[key].isDone).length}
            </strong> item left
          </span>
        </footer>
      </section>
    );
  },
});

export default Todo
