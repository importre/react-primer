var mountNode = document.getElementById('dataflow')
var Hello = React.createClass({
  getInitialState: function() {
    return {
      name: ''
    };
  },
  handleChange: function() {
    this.setState({
      name: this.refs.input.getDOMNode().value
    });
  },
  render: function() {
    return (
      <div>
        <div>Hello <b>{this.state.name}</b>!</div>
        <br/>
        <input
          type="text" placeholder="Type your name"
          ref="input" onChange={this.handleChange}/>
      </div>
    );
  }
});

React.render(<Hello />, mountNode);
