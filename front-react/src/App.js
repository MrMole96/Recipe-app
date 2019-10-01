import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      testInput: "sss"
    };

  }

  callApi() {
    fetch('http://localhost:9000/recipesRouter')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }
  sendTestData = () => {
  
    fetch('http://localhost:9000/recipesRouter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.testInput,
        test:'test'
      })
    });
  }
  handleChange = (event) => {
    console.log(event);
    this.setState({ testInput: event.target.value })
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input value={this.state.testInput} onChange={this.handleChange} />
        <p className="App-intro">{this.state.apiResponse}</p>
        <button onClick={this.sendTestData}>POST</button>
      </div>
    );
  }

}

export default App;
