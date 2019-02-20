import React from "react";
import Square from "../component/Square";
import calculateWinner from "./calculateWinner";

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state={
            square:Array(9).fill(null),
            XIsNext:true,
        }
    }
    renderSquare(i) {
        return <Square
            value={this.state.square[i]}
            onClick={()=>this.handleClick(i)}
        />;
    }

    handleClick(i) {
    const square =this.state.square.slice();
    if (calculateWinner(square) || square[i]) {
        return;
    }
    square[i]=this.state.XIsNext ? 'X':'O';
    this.setState({
        square:square,
        XIsNext:!this.state.XIsNext,
    });
    }

    render() {
        const winner = calculateWinner(this.state.square);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
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


}

export default Board