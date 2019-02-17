const Timer = React.createClass({
  getInitialState() {
    return {timeElapsed: 0,
            run: false,
    };
  },

  componentDidMount() {
  this.timer = setInterval(this.tick, 100);
  },

  tick() {
    if (this.state.run)
      this.setState({
        timeElapsed: this.state.timeElapsed + 1
    });
  },

  runTimer() {
    this.setState({
      run: !this.state.run
    });
  },

  clearTimer() {
    this.setState({
      timeElapsed: 0
    });
  },

  render() {
    return (<div>
      <h1>{this.state.timeElapsed}</h1>
      <button onClick={this.runTimer}>Start/Stop</button>
      <button onClick={this.clearTimer}>Clear</button>

    </div>);
  }
});

ReactDOM.render(<Timer/>, document.getElementById('timer'));
