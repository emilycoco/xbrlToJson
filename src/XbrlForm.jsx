var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea placeholder="Paste xbrl here"
        value={this.state.value}
        onChange={this.handleChange} />
        <button type="submit">Submit</button>
        <p>{this.state.json}</p>
      </form>
    );
  },
  getInitialState: function() {
    return {
      value: ''
    };
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('submitting from form', this.state.value);
    this.props.onXbrlSubmit(this.state.value);
  }
});

