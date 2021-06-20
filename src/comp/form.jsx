/* eslint-disable*/
import React from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';

class Formcomp extends React.Component {
  constructor() {
    super();
    this.state = { inputval: '', category: [], select: '' };
    this.inputFunc = this.inputFunc.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://levserebryanskiy-json-server.herokuapp.com/category')
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
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Form size="md">
          <Form.Row>
            <Form.Control type="text" value={inputval} onChange={this.inputFunc} />
            <Form.Control
              defaultValue="DEFAULT"
              as="select"
              onChange={(e) => this.setState({ select: e.target.value })}
            >
              <option value="DEFAULT" disabled>
                Choose category
              </option>
              {category.map((categ) => (
                <option key={categ.id} value={categ.text} label={categ.text} />
              ))}
            </Form.Control>
            <Button type="button" onClick={(e) => press(e, inputval, select)}>
            Добавить task
            </Button>
          </Form.Row>
          <br />
          <br />
        </Form>
      </div>
    );
  }
}

export default Formcomp;
