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
      var name1 = prompt("Who is going to play as 'X'?")
      var name2 = prompt("Who is going to play as 'O'?")
      return {
        squares:[
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "]
        ],
        status:"in-progress",
        players: [
          { mark:"X", name: name1 },
          { mark:"O", name: name2 }
        ],
        errors: null
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
      var row = parseInt(square / 3)
      var col = parseInt(square % 3)
      var newState = this.state.squares
      
      if (this.tileEmpty(newState[row][col])){
        this.fillTile(newState, row, col)
        this.updateTurn() 
      }else{ console.log("Invalid Move")}
    },
    tileEmpty: function(tile){
      return tile === " " ? true : false
    },
    fillTile: function(board, row, col){
      board[row][col] = this.currentPlayer()
      this.updateBoard(board)
    },
    updateBoard: function(newBoard){
      console.log(newBoard)
      this.setState({
        squares: newBoard,
      })
    },
    updateTurn: function(){
      this.setState({
        players: [this.state.players[1],this.state.players[0]]
      })
    },
    currentPlayer: function(){
      return this.state.players[0]
    }
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();