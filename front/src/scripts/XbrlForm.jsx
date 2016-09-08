var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea placeholder="Paste xbrl or xml document here"
        value={this.state.value}
        onChange={this.handleChange} />
        <div className="button-container">
          <button className="cta" type="submit">Submit</button>
          <button onClick={this.loadSampleDoc}>Sample Document</button>
          <button onClick={this.clear}>Clear</button>
        </div>
        {this.props.error ? <span className="error">{this.props.error}</span> : null}
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
    this.props.onXbrlSubmit(this.state.value);
  },
  clear: function(e) {
    e.preventDefault();
    this.setState({value: ''});
  },
  loadSampleDoc: function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/sample-doc', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(resp) {
      if (resp.status === 500) {
        this.props.loadError('Could not load sample document.');
      } else {
        resp.json().then(function(rspText) {
          this.setState({value: rspText.response});
        }.bind(this))
        .catch(function(err) {
          this.props.loadError('Could not load sample document.');
        }.bind(this));
      }
    }.bind(this))
    .catch(function(err) {
      this.props.loadError('Could not load sample document.');
    }.bind(this));
  }
});

