var NowApp = React.createClass({
  // Mounting
  getInitialState: function() {
    console.log('%c Invoked getInitialState!!! ', 'background: #ff0; color: #f00');
    return {
      checked: false,
      now: new Date().toTimeString()
    };
  },
  componentWillMount: function() {
    console.log('%c Invoked componentWillMount!!! ', 'background: #ff0; color: #f00');
  },
  componentDidMount: function() {
    console.log('%c Invoked componentDidMount!!! ', 'background: #ff0; color: #f00');
  },

  // Updating
  componentWillReceiveProps: function(nextProps) {
    console.log('%c Invoked componentWillReceiveProps!!! ', 'background: #ff0; color: #f00');
    console.log('nextProps:', nextProps);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('%c Invoked shouldComponentUpdate!!! ', 'background: #ff0; color: #f00');
    console.log('this.state:', this.state);
    console.log('nextState:', nextState);
    return this.state.checked;
  },
  componentWillUpdate: function(nextProps, nextState) {
    console.log('%c Invoked componentWillUpdate!!! ', 'background: #ff0; color: #f00');
  },
  componentDidUpdate: function(nextProps, nextState) {
    console.log('%c Invoked componentDidUpdate!!! ', 'background: #ff0; color: #f00');
  },

  // Unmounting
  componentWillUnmount: function()  {
    console.log('%c Invoked componentWillUnmount!!! ', 'background: #ff0; color: #f00');
  },

  // handler
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({
      now: new Date().toTimeString()
    });
  },
  handleCheck: function(e) {
    this.setState({
      checked: e.target.checked
    });
  },

  // render
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-default">update</button>
        </form>
        <br/>
        <input type="checkbox" onChange={this.handleCheck} ref="cb" /> shouldComponentUpdate
        <h3>{this.state.now}</h3>
      </div>
    );
  }
});

var MainApp = React.createClass({
  getInitialState: function() {
    return {
      prevComponent: null
    };
  },
  componentDidMount: function() {
    this.setState({
      container: document.getElementById('subContainer')
    });
  },
  onMount: function() {
    var component = React.render(<NowApp name="importre" />, this.state.container);
    console.log('Mounted, component diff:', this.state.prevComponent === component);
    this.setState({
      prevComponent: component
    });
  },
  onUnmount: function() {
    var result = React.unmountComponentAtNode(this.state.container);
    console.log('Unmounted:', result);
  },
  render: function() {
    return (
      <div>
        <p>크롬 <code>DevTools</code>를 열어 로그를 봅시다!</p>
        <div className="btn-group" role="group" aria-label="...">
          <button className="btn btn-default" onClick={this.onMount}>Mount</button>
          <button className="btn btn-default" onClick={this.onUnmount}>Unmount</button>
        </div>
        <br />
        <br />
        <div id="subContainer"></div>
      </div>
    );
  }
});

var container = document.getElementById('lifecycle')
React.render(<MainApp />, container);
