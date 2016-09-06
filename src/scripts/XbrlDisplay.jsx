var React = require('react');
var jsonFormat = require('json-format');


module.exports = React.createClass({
  render: function() {
    if (this.props.output) {
      return (
        <div className="json-formatted">
          <span>{'{'}</span>
          <ul>{this.processJsonOutput(this.props.output)}</ul>
          <span>{'}'}</span>
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
    var lines = Object.keys(output).map((key, idx) => {

    console.log(typeof output[key])
      return (
          <li key={idx}>
            <span className="bold">"{key}": </span>
            <span>{(typeof output[key] === 'number' ? output[key] : '"' + output[key] + '"') + (Object.keys(output).length - 1 === idx ? '' : ',')}</span>
          </li>
      );
    });

    return lines;
  }
});
