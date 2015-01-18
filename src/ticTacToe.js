/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({
    render: function() {
      var tileClass = this.props.content === " " ? null : this.props.content
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
    getCells: function(){
      return this.state.squares.reduce(function(c,p){
        return c.concat(p)
      })
    },
    render: function() {
      return (
        <div>
          {this.getCells().map(function(cell,index){
              return <Tile content={cell} key={index}/>
          })}
        </div>
      )
    },
  });

  React.render(
    <TicTacToe />,
    document.getElementById('app')
  );
})();