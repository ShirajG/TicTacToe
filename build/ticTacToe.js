/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      return (
        React.createElement("div", null)
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
    render: function() {
      return (
        React.createElement("div", null)
      )
    },
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();