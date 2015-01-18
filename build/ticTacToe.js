/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",

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
        React.createElement("div", {className: tileClass}, "A tile: ", this.props.content)
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
      return (
        React.createElement("div", null, 
          this.getCells().map(function(cell,index){
              return React.createElement(Tile, {content: cell, key: index})
          })
        )
      )
    },
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();