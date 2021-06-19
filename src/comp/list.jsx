/* eslint-disable*/
import React from 'react';
import axios from 'axios';
import { ListGroup, CloseButton } from 'react-bootstrap';


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
      .get('http://localhost:3001/tasks')
      .then((response) => this.setState({ tasks: response.data }));
  }

  press(event, value, category) {
    event.preventDefault();
    axios
      .post('http://localhost:3001/tasks', {
        id: new Date(),
        check: false,
        text: value,
        category,
      })
      .then((result) =>
        axios
          .get('http://localhost:3001/tasks')
          .then((response) => this.setState({ tasks: response.data })),
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
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter((item) => item.id !== id) });
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then((result) =>
        axios
          .get('http://localhost:3001/tasks')
          .then((response) => this.setState({ tasks: response.data })),
      );
  }

  render() {
    const { tasks } = this.state;
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
              <span>  {task.text}</span>
              <span> - {task.category} </span>
              <CloseButton onClick={(event) => this.delete(event, task.id)} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Listcomp;
