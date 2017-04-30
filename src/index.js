import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { // instead of: class Square extends React.Component {

    return (
        <button className="square" onClick={() => props.onClick()}> {/* this.setState() schedules a component update */}
            {props.value} {/* displays value field of props passed in from parent (board) */}
        </button>
    );

}

class Board extends React.Component {

    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null), // array of 9 values, set to null as default
            xIsNext: true,
        };
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />; {/* passign two props to Square (value and onClick) */ }
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        // what goes here???

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
        const squares = this.state.squares.slice(); // slice() copies the squares array instead of mutating existing array
        if (calculateWinner(squares) || squares[i]) { // if a winner has been declared or a square has already been clicked => do nothing
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; // update new array, use turnary operator to choose yes or no
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        }); // replace array in this.state
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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
