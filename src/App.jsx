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
    this.setState({data: xbrlStr});
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
