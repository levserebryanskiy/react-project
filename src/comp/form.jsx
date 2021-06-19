import React from 'react';
import axios from 'axios';

class Formcomp extends React.Component {
  constructor() {
    super();
    this.state = { inputval: '', category: [], select: '' };
    this.inputFunc = this.inputFunc.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((response) => this.setState({ category: response.data }));
  }

  inputFunc(event) {
    event.preventDefault();
    this.setState({ inputval: event.target.value });
  }

  render() {
    const { inputval, category, select } = this.state;
    const { press } = this.props;
    return (
      <div>
        <input type="text" value={inputval} onChange={this.inputFunc} />
        <select onChange={(e) => this.setState({ select: e.target.value })}>
          <option disabled>Выберите категорию</option>
          {category.map((el) => (
            <option key={el.id} value={el.text} label={el.text} />
          ))}
        </select>
        <br />
        <button type="button" onClick={(e) => press(e, inputval, select)}>
          Добавить task
        </button>
      </div>
    );
  }
}

export default Formcomp;
