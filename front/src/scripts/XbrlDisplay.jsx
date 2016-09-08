var React = require('react');

module.exports = React.createClass({
  render: function() {
      return (
        <div className="container" id="display">
          <h2>Parsed Json</h2>
          <div className="json-formatted">
            <span>{'{'}</span>
            <ul>{this.processJsonOutput(this.props.output)}</ul>
            <span>{'}'}</span>
          </div>
        </div>
      );
  },
  processJsonOutput: function(output) {
    var lines = Object.keys(output).map((key, idx) => {
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
