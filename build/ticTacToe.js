/**
* @jsx React.DOM
*/
(function(){
  var Tile = React.createClass({displayName: "Tile",
    render: function() {
      var marker = this.props.content === " " ? null : this.props.content
      var position = "_"+this.props.position
      var classes = "tile " + position
      if (marker){ classes += " "+marker}
      return (
        React.createElement("div", {onClick: this.props.onClick, className: classes}, "A tile: ", this.props.content)
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
        won: false,
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
    getRows: function(){
      return this.state.squares
    },
    getCols: function(){
      result = [[],[],[]]
      this.getCells().forEach(function(el,index){
        result[parseInt(index % 3)].push(el)
      })
      return result
    },
    getDiagonals: function(){
      diagonals = []
      var cells = this.getCells()
      diagonals.push([cells[0],cells[4],cells[8]])
      diagonals.push([cells[2],cells[4],cells[6]])
      return diagonals
    },
    render: function() {
      var that = this
      return (
        React.createElement("div", null, 
          this.getCells().map(function(cell,index){
            return React.createElement(Tile, {onClick: that.handleClick.bind(null,index), content: cell, position: index, key: index})
          }), 
          React.createElement("div", {className: "status"}, this.state.status), 
          React.createElement("div", {className: "infoArea"}, "Current player: ", this.state.players[0].name, " playing as ", this.state.players[0].mark), 
          React.createElement("div", {className: "errors"}, this.state.errors)
        )
      )
    },
    handleClick: function(square) {
      var row = parseInt(square / 3)
      var col = parseInt(square % 3)
      var newState = this.state.squares
      
      if(this.state.won){
        this.setError("The game is over, no further moves can be made.")
      }
      else if ( this.tileEmpty(newState[row][col]) ){
        this.setError(null)
        this.fillTile(newState, row, col)
        this.updateGame() 
      }else{ this.setError("Invalid Move")}
    },
    updateGame: function(){
      if (this.checkWin()){
        this.setState({
          won: true,
          status: "" + this.currentPlayer().name + " wins!"
        })
      }else{
        this.updateTurn()
      }
    },
    checkWin: function(){
      var possibleWins = this.getDiagonals().concat(this.getCols()).concat(this.getRows())
      var player = this.currentPlayer()
      for(var i = 0; i < possibleWins.length; i++){
        if (possibleWins[i].join("") === ""+player.mark +player.mark +player.mark ){
          return true
        }
      }
      return false
    },
    tileEmpty: function(tile){
      return tile === " " ? true : false
    },
    fillTile: function(board, row, col){
      board[row][col] = this.currentPlayer().mark
      this.updateBoard(board)
    },
    updateBoard: function(newBoard){
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
    },
    setError: function (message) {
      this.setState({
        errors: message
      })
    }    
  });

  React.render(
    React.createElement(TicTacToe, null),
    document.getElementById('app')
  );
})();