/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({
    render: function() {
      var tileClass = this.props.content === " " ? null : this.props.content
      return (
        <div onClick={this.props.onClick} className={tileClass}>A tile: {this.props.content}</div>
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
      var that = this
      return (
        <div>
          {this.getCells().map(function(cell,index){
              return <Tile onClick={that.handleClick.bind(null,index)} content={cell} key={index}/>
          })}
        </div>
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
    <TicTacToe />,
    document.getElementById('app')
  );
})();