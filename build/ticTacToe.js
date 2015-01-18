/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      var tileClass = this.props.content === " " ? null : this.props.content
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
    handleClick: function(i) {
      console.log('You clicked: ' + i );
    },
    render: function() {
      return (
        React.createElement("div", {onClick: this.handleClick}, 
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