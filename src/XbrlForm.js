var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea placeholder="Paste xbrl here"/>
        <button type="submit">Submit</button>
      </form>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('parsing!');
  }
});
