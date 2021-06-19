/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import HeadComp from './head';

class CategoryComp extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      inputval: '',
    };
    this.inputFunc = this.inputFunc.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((response) => this.setState({ category: response.data }));
  }

  add(event, value) {
    event.preventDefault();
    const { category, inputval } = this.state;

    const check = category.find((categ) => categ.text === inputval);

    if (check) {
      console.log('повторение');
    }

    axios
      .post('http://localhost:3001/category', {
        id: Math.random(),
        text: value,
      })
      .then((result) => axios
        .get('http://localhost:3001/category')
        .then((response) => this.setState({ category: response.data })));
  }

  inputFunc(event) {
    this.setState({
      inputval: event.target.value,
    });
  }

  render() {
    const { category, inputval } = this.state;

    return (
      <div>
        <br />
        <HeadComp />
        <br />
        <form>
          <input type="text" value={inputval} onChange={this.inputFunc} />
          <br />
          <button type="button" onClick={(e) => this.add(e, inputval)}>
            Добавить категорию
          </button>
        </form>
        <ul>
          {category.map((categ) => (
            <li key={categ.id}>
              <span>{categ.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CategoryComp;
