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
        <div>
          {this.getCells().map(function(cell,index){
            return <Tile onClick={that.handleClick.bind(null,index)} content={cell} key={index}/>
          })}
          <div className='infoArea'> Current player: {this.state.players[0].name}</div>
          <div className='errors'>{this.state.errors}</div>
        </div>
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
      //Check for a win
      //If theres a winner, set a win message
      //Lock the game

      // If no win
      // Advance to the next players turn
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
    <TicTacToe />,
    document.getElementById('app')
  );
})();