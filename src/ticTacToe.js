/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({
    render: function() {
      return (
        <div></div>
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