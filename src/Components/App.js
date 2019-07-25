import React from "react";
import "./App.css";
import Square from "./square";
import Player from "./player";
import Timer from "./timer";

const timer = new _timer(function(time) {
	if (time > 0) {
	} else if (time == 0) {
		timer.stop();
		timer.timeUp = true;
		console.log(timer);
	}
});
timer.reset(0);
timer.mode(0);

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			filled: [null, null, null, null, null, null, null, null, null],
			xTurns: true,
			player1: 0,
			player2: 0,
			timeUp: false,
			seconds: 10
		};
		this.handleClick = this.handleClick.bind(this);
		this.winner = this.winner.bind(this);
		this.update = this.update.bind(this);
		this.resetBoard = this.resetBoard.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	handleClick(i) {
		let { filled, xTurns } = this.state;
		let winner = this.winner(filled);
		let copyFilled = filled;

		if (!winner) {
			if (!filled[i]) {
				if (xTurns) {
					copyFilled[i] = "X";
					this.setState({
						filled: [...copyFilled],
						xTurns: false
					});
				} else {
					copyFilled[i] = "O";
					this.setState({
						filled: [...copyFilled],
						xTurns: true
					});
				}
			}
		}
		timer.reset(10);
		timer.start(1000);
		timer.timeUp = false;
		setTimeout(() => {
			if (timer.timeUp)
				this.setState({
					timeUp: true
				});
		}, 10500);
		const temp = () =>
			setTimeout(() => {
				let time = timer.getTime();
				this.setState({ seconds: time });
				if (time > 0) {
					temp();
				}
			}, 1000);
		temp();
	}

	winner(filled) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		let count = 0;
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (filled[i] != null) count++;
			if (filled[a] && filled[a] === filled[b] && filled[a] === filled[c]) {
				return filled[a];
			} else if (count + 1 === filled.length) return "Draw";
			else if (this.state.timeUp) {
				if (this.state.xTurns) return "O";
				else return "X";
			}
		}

		return null;
	}
	update(winner) {
		timer.stop();
		this.setState({
			filled: [null, null, null, null, null, null, null, null, null],
			timeUp: false,
			seconds: 10
		});
		if (winner === "X") {
			this.setState(prevState => {
				return {
					player1: prevState.player1 + 1
				};
			});
			localStorage.setItem("player1", this.state.player1);
		} else if (winner === "O") {
			this.setState(prevState => {
				return {
					player2: prevState.player2 + 1
				};
			});
			localStorage.setItem("player2", this.state.player2);
		}
	}
	resetBoard() {
		timer.reset(10);
		this.setState(prevState => {
			return {
				filled: [null, null, null, null, null, null, null, null, null],
				xTurns: !prevState.xTurns,
				timeUp: false,
				seconds: 10
			};
		});
		timer.stop();
	}
	resetGame() {
		this.setState({
			player1: 0,
			player2: 0
		});
		localStorage.setItem("player1", 0);
		localStorage.setItem("player2", 0);
		this.resetBoard();
	}

	componentDidMount() {
		let player1 = parseInt(localStorage.getItem("player1"));
		let player2 = parseInt(localStorage.getItem("player2"));
		this.setState({
			player1,
			player2
		});
	}

	render() {
		let status;
		let winner = this.winner(this.state.filled);

		if (winner === "X" || winner === "O") {
			status = "Winner: " + winner;
			setTimeout(() => this.update(winner), 2000);
		} else if (winner === "Draw") {
			status = "Match Draw";
			setTimeout(() => this.update(winner), 2000);
		} else {
			status = "Next player: " + (this.state.xTurns ? "X" : "O");
		}

		return (
			<div className="game">
				<div className="player" id="player1">
					<Player name={"Player 1 (X)"} score={this.state.player1} />
				</div>
				<div className="mid">
					<div className="status">
						<div className="status-content">{status}</div>
					</div>
					<div className="board">
						<Square method={this.handleClick} value={this.state.filled} />
					</div>
					<Timer seconds={this.state.seconds} />
					<div className="btn">
						<div>
							<button className="resetBoard" onClick={this.resetBoard}>
								Reset board
							</button>
						</div>
						<div>
							<button className="resetGame" onClick={this.resetGame}>
								Reset Game
							</button>
						</div>
					</div>
				</div>
				<div className="player" id="player2">
					<Player name={"Player 2 (O)"} score={this.state.player2} />
				</div>
			</div>
		);
	}
}
function _timer(callback) {
	var time = 0; //  The default time of the timer
	var mode = 1; //    Mode: count up or count down
	var status = 0; //    Status: timer is running or stoped
	var timer_id; //    This is used by setInterval function
	this.timeUp = false;

	// this will start the timer ex. start the timer with 1 second interval timer.start(1000)
	this.start = function(interval) {
		interval = typeof interval !== "undefined" ? interval : 1000;

		if (status == 0) {
			status = 1;
			timer_id = setInterval(function() {
				switch (mode) {
					default:
						if (time) {
							time--;
							generateTime();
							if (typeof callback === "function") callback(time);
						}
						break;

					case 1:
						if (time < 86400) {
							time++;
							generateTime();
							if (typeof callback === "function") callback(time);
						}
						break;
				}
			}, interval);
		}
	};

	//  Same as the name, this will stop or pause the timer ex. timer.stop()
	this.stop = function() {
		if (status == 1) {
			status = 0;
			clearInterval(timer_id);
		}
	};

	// Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
	this.reset = function(sec) {
		sec = typeof sec !== "undefined" ? sec : 0;
		time = sec;
		generateTime(time);
	};

	// Change the mode of the timer, count-up (1) or countdown (0)
	this.mode = function(tmode) {
		mode = tmode;
	};

	// This methode return the current value of the timer
	this.getTime = function() {
		return time;
	};

	// This methode return the current mode of the timer count-up (1) or countdown (0)
	this.getMode = function() {
		return mode;
	};

	// This methode return the status of the timer running (1) or stoped (1)
	this.getStatus = function() {
		return status;
	};

	// This methode will render the time variable to hour:minute:second format
	function generateTime() {
		var second = time % 60;
		second = second < 10 ? "0" + second : second;
	}
}
