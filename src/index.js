import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player1: true
    };
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (calculateTie(this.state.squares)) {
      status = "Tie!";
    } else if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.player1 ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i] || calculateTie(squares)) {
      return;
    }
    if (this.state.player1) {
      squares[i] = "X";
      this.setState({
        squares: squares,
        player1: false
      });
    } else {
      squares[i] = "O";
      this.setState({
        squares: squares,
        player1: true
      });
    }
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // An array of possible wins

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; //a,b,c correspond to squares indexes
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //checking if value in squares based on index
      return squares[a];
    }
  }
  return null;
}

function calculateFullBoard(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

function calculateTie(squares) {
  if (!calculateWinner(squares) && calculateFullBoard(squares)) {
    return true;
  } else {
    return false;
  }
}
ReactDOM.render(<Game />, document.getElementById("root"));
