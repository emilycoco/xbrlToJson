var React = require('react');
var prettyjson = require('prettyjson');


module.exports = React.createClass({
  render: function() {
    if (this.props.output) {
      return (
        <div>
          <ul>{this.processJsonOutput(this.props.output)}</ul>
        </div>
      )
    } else {
      return (
        <div>
          <span>Parsed json will show here</span>
        </div>
      )
    }
  },
  processJsonOutput: function(output) {
    return prettyjson.render(output).toString();
  }
})
