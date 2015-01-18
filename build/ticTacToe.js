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
        status:"in-progress"
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
              return React.createElement(Tile, {onClick: that.handleClick, content: cell, key: index})
          })
        )
      )
    },
    handleClick: function() {
      console.log('HanldeClick in TTT' );
    }
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();