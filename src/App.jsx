var React = require('react');
var ReactDOM = require('react-dom');

var XbrlForm = require('./XbrlForm.jsx');
var XbrlDisplay = require('./XbrlDisplay.jsx');
var App = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <XbrlForm onXbrlSubmit={this.handleXbrlInput}/>
        </div>
        <div>
          <XbrlDisplay output={this.state.data}/>
        </div>
      </div>
    );
  },
  getInitialState: function() {
    return {
      data: 'Output will show up here'
    };
  },
  handleXbrlInput: function(xbrlStr) {
    console.log('parent handles input');
    this.setState({data: "Parsing json..."});
    this.requestParsedInput(xbrlStr);
  },
  requestParsedInput: function(inputStr) {
    console.log('sending request');
    fetch('http://localhost:3000/parse-string', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "data": inputStr,
    })
  })
    .then(function(resp) {
      resp.json().then(function(rspJson) {
        this.setState({data: JSON.stringify(rspJson.response)});
      }.bind(this))
      .catch(function(err) {
        this.setState({data: 'Error parsing json: ' + err})
      }.bind(this));
    }.bind(this))
    .catch(function(err) {
      this.setState({data: 'Error parsing json: ' + err})
    }.bind(this));
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
