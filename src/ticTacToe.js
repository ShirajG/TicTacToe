/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({

    getInitialState: function(){
      return{
        filled: false
      }
    },
    fill: function (letter) {
      this.setState({
        filled: true
      })
    },
    render: function() {
      var tileClass = this.state.filled ? this.state.contents : null
      return (
        <div className={tileClass}>A tile: {this.props.content}</div>
      )
    }
  });

  var TicTacToe = React.createClass({
    getInitialState: function() {
      return {
        squares:[
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "]
        ],
        status:"in-progress"
      }
    },
    render: function() {
      return (
        <div></div>
      )
    },
  });

  React.render(
    <TicTacToe />,
    document.getElementById('app')
  );
})();