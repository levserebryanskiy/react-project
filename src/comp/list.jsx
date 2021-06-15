import React from 'react';
import Formcomp from './form';

class Listcomp extends React.Component {
  constructor() {
    super();
    this.state = { tasks: [] };
    this.press = this.press.bind(this);
  }

  press(event, value) {
    event.preventDefault();
    this.setState((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: new Date(),
          check: false,
          text: value,
        },
      ],
    }));
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
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <Formcomp press={this.press} />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <input
                type="checkbox"
                checked={task.check}
                onChange={(event) => this.check(event, task.id)}
              />
              <button type="button" onClick={(event) => this.delete(event, task.id)}>
                Удалить task
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Listcomp;
