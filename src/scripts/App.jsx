var React = require('react');
var ReactDOM = require('react-dom');

var XbrlForm = require('./XbrlForm.jsx');
var XbrlDisplay = require('./XbrlDisplay.jsx');
var App = React.createClass({
  render: function() {
    return (
      <div>
        <header><h1>XBRL to JSON</h1></header>
        <p>XBRL is a reporting language built on top of XML used to record financial data such as quarterly reports. The SEC accepts filings in XBRL format, so these documents are very useful in researching a company's financials. The SEC provides more robust tools for parsing XBRL, but they can be complicated to use, so this tool provides a really simple way to extract key pieces of information to a widely used data format (json) for research purposes. This tool won't parse an entire document, it just looks for the most commonly used pieces of information. Results are not guaranteed to be accurate.</p>
          <div className="container" onClick={this.resetError}>
            <h2>Xbrl goes here:</h2>
            <XbrlForm onXbrlSubmit={this.handleXbrlInput} error={this.state.error}/>
          </div>
          {this.state.data ? <XbrlDisplay output={this.state.data}/> : null}
      </div>
    );
  },
  getInitialState: function() {
    return {
      data: '',
      error: null
    };
  },
  handleXbrlInput: function(xbrlStr) {
    console.log('parent handles input');
    this.resetError();
    this.requestParsedInput(xbrlStr);
  },
  resetError: function() {
    this.setState({error: null});
  },
  scrollToOutput: function() {
    document.getElementById('display').scrollIntoView({ behavior: 'smooth' });
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
        if (rspJson.response) {
          this.setState({data: rspJson.response});
          this.scrollToOutput();
        } else {
          this.setState({error: 'Server error: input format not recognized as XBRL or XML'})
        }
      }.bind(this))
      .catch(function(err) {
        this.setState({error: 'Error parsing json: ' + err})
      }.bind(this));
    }.bind(this))
    .catch(function(err) {
      this.setState({error: 'Error parsing json: ' + err})
    }.bind(this));
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
