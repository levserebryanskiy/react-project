/* eslint-disable*/
import React from 'react';
import axios from 'axios';
import { ListGroup, CloseButton } from 'react-bootstrap';
import { connect } from 'react-redux';

import Formcomp from './form';
import HeadComp from './head';

class Listcomp extends React.Component {
  constructor() {
    super();
    this.state = { tasks: [] };
    this.press = this.press.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://levserebryanskiy-json-server.herokuapp.com/tasks')
      .then((response) => this.props.getTask(response.data));
  }

  press(event, value, category) {
    event.preventDefault();
    this.props.addTask({
      id: Date.now(),
      check: false,
      text: value,
      category,
    });

    axios
      .post('https://levserebryanskiy-json-server.herokuapp.com/tasks', {
        id: new Date(),
        check: false,
        text: value,
        category,
      })
      .then((result) =>
        axios
          .get('https://levserebryanskiy-json-server.herokuapp.com/tasks')
          .then((response) => this.props.getTask(response.data)),
      );
  }

  check(event, itemId) {
    event.preventDefault();
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((item) => {
        let check = false;
        if (item.id === itemId) check = !item.check;
        else check = item.check;
        return { ...item, check };
      }),
    });
  }

  delete(event, id) {
    event.preventDefault();
    this.props.deleteTask(id);
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter((item) => item.id !== id) });
    axios
      .delete(`https://levserebryanskiy-json-server.herokuapp.com/tasks/${id}`)
      .then((result) =>
        axios
          .get('https://levserebryanskiy-json-server.herokuapp.com/tasks')
          .then((response) => this.props.getTask(response.data)),
      );
  }

  render() {
    // const { tasks } = this.state;
    const { tasks } = this.props;

    return (
      <div>
        <br />
        <HeadComp />
        <br />
        <Formcomp press={this.press} />
        <ListGroup style={{ maxWidth: '600px', margin: 'auto' }}>
          {tasks.map((task, index) => (
            <ListGroup.Item>
              <input
                type="checkbox"
                checked={task.check}
                onChange={(event) => this.check(event, task.id)}
              />
              <span> {task.text}</span>
              <span> - {task.category} </span>
              <CloseButton onClick={(event) => this.delete(event, task.id)} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: (payload) => dispatch({ type: 'get_task', payload }),
    addTask: (payload) => dispatch({ type: 'add_task', payload }),
    deleteTask: (payload) => dispatch({ type: 'delete_task', payload }),
    addCategory: (payload) => dispatch({ type: 'add_category', payload }),
  };
};

const mapStateToProps = (state) => ({ tasks: state.tasks, category: state.category });

export default connect(mapStateToProps, mapDispatchToProps)(Listcomp);
