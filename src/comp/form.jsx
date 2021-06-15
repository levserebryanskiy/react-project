import React from 'react';

class Formcomp extends React.Component {
  constructor() {
    super();
    this.state = { inputval: '' };
    this.inputFunc = this.inputFunc.bind(this);
  }

  inputFunc(event) {
    event.preventDefault();
    this.setState({ inputval: event.target.value });
  }

  render() {
    const { inputval } = this.state;
    const { press } = this.props;
    return (
      <div>
        <input type="text" value={inputval} onChange={this.inputFunc} />
        <br />
        <button type="button" onClick={(e) => press(e, inputval)}>
          Добавить task
        </button>
      </div>
    );
  }
}

export default Formcomp;
