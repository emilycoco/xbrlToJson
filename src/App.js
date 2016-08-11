var React = require('react');
var ReactDOM = require('react-dom');

var XbrlForm = require('./XbrlForm');
var App = React.createClass({
  render: function() {
    return (
      <div>
        <XbrlForm />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('content'));
