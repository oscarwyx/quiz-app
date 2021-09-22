import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
// state realized interactive functions
// Add a construction method to the Square component


constructor(props) {
  super(props);
  this.state = {
      squares: Array(9).fill(null),
      /* boolean */
      iXNext:true,
  };
}


render() {
  return (
      <button className="square"
          onClick={() => this.props.onClick()}
      >
          {this.props.value}
      </button>
  );
}




  }
  function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

  class Board extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
          squares: Array(9).fill(null),
      };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.iXNext ? 'O' : 'X';
    this.setState({
        squares: squares,
        iXNext: !this.state.iXNext,
    });
}




  renderSquare(i) {
    return <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
    />;
}

render() {
  const winner = calculateWinner(this.state.squares);
  let status;
  if (winner) {
      status = "Winner: " + winner;
  } else {
      status = 'Next player: ' + (this.state.iXNext ? 'O' : 'X');
  }
  // const status = 'Next player: ' + (this.state.iXNext ? 'X' : 'O');
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
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );