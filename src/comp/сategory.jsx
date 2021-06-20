/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Alert, Button, Table, Modal, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeadComp from './head';

class CategoryComp extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      inputval: '',
      modal: false,
      alert: false,
    };
    this.inputFunc = this.inputFunc.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/category')
      .then((response) => this.props.getCategory(response.data));
  }

  add(event, value) {
    event.preventDefault();
    const { inputval } = this.state;
    const { category } = this.props;

    const check = category.find((categ) => categ.text === inputval);

    if (check) {
      return this.setState({ alert: true });
    }
    this.props.addCategory({
      id:  Date.now(),
      text: value,
    })
    axios
      .post('http://localhost:3001/category', {
        id:  Date.now(),
        text: value,
      })
      .then((result) =>
        axios
          .get('http://localhost:3001/category')
          .then((response) => this.props.getCategory(response.data)),
      );
      this.close();
  }

  inputFunc(event) {
    this.setState({
      inputval: event.target.value,
    });
  }

  open() {
    this.setState({
      modal: true,
    });
  }

  close() {
    this.setState({
      modal: false,
    });
  }

  render() {
    const { inputval, modal, alert } = this.state;
    const { category } = this.props;

    return (
      <div>
        <HeadComp isShow onClick={this.open} />
        <Alert
          variant="danger"
          show={alert}
          onClose={() => this.setState({ alert: false })}
          dismissible
          style={{ position: 'absolute', zIndex: 10000 }}
        >
          <p>Категория уже существует</p>
        </Alert>
        <Modal show={modal} onHide={this.close} style={{ position: 'relative' }}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить категорию</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control value={inputval} onChange={this.inputFunc} type="text" />
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.close}>
              Закрыть
            </Button>
            <Button onClick={(e) => this.add(e, inputval)}>Добавить</Button>
          </Modal.Footer>
        </Modal>
        <br />
        <br />
        <br />

        <Table striped bordered hover style={{ maxWidth: '600px', margin: 'auto' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Категория</th>
            </tr>
          </thead>
          <tbody>
            {category.map((categ, index) => (
              <tr>
                <td>{index++}</td>
                <td>{categ.text}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (payload) => dispatch({ type: 'get_category', payload }),
    addCategory: (payload) => dispatch({ type: 'add_category', payload }),
  };
};

const mapStateToProps = (state) => ({ category: state.category });

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp);