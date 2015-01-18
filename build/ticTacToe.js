/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      var tileClass = this.props.content === " " ? null : this.props.content
      return (
        React.createElement("div", {onClick: this.props.onClick, className: tileClass}, "A tile: ", this.props.content)
      )
    }
  });

  var TicTacToe = React.createClass({displayName: "TicTacToe",
    getInitialState: function() {
      return {
        squares:[
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "]
        ],
        status:"in-progress",
        players: ["X", "O"] 
      }
    },
    getCells: function(){
      return this.state.squares.reduce(function(c,p){
        return c.concat(p)
      })
    },
    render: function() {
      var that = this
      return (
        React.createElement("div", null, 
          this.getCells().map(function(cell,index){
              return React.createElement(Tile, {onClick: that.handleClick.bind(null,index), content: cell, key: index})
          })
        )
      )
    },
    handleClick: function(square) {
      // console.log('HandleClick in TTT' );
      // console.log( this );
      // console.log( square )
      var row = parseInt(square / 3)
      var col = parseInt(square % 3)
      var newState = this.state.squares
      newState[row][col] = "?"
      this.setState({squares: newState})
    }
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();