import React from "react";
import Box from "./box";
import "./App.css";

export default class Square extends React.Component {
	render() {
		return (
			<div className="board-game">
				<div className="board-row">
					<Box
						id={0}
						method={() => this.props.method(0)}
						value={this.props.value[0]}
					/>
					<Box
						id={3}
						method={() => this.props.method(3)}
						value={this.props.value[3]}
					/>
					<Box
						id={6}
						method={() => this.props.method(6)}
						value={this.props.value[6]}
					/>
				</div>
				<div className="board-row">
					<Box
						id={1}
						method={() => this.props.method(1)}
						value={this.props.value[1]}
					/>
					<Box
						id={4}
						method={() => this.props.method(4)}
						value={this.props.value[4]}
					/>
					<Box
						id={7}
						method={() => this.props.method(7)}
						value={this.props.value[7]}
					/>
				</div>
				<div className="board-row">
					<Box
						id={2}
						method={() => this.props.method(2)}
						value={this.props.value[2]}
					/>
					<Box
						id={5}
						method={() => this.props.method(5)}
						value={this.props.value[5]}
					/>
					<Box
						id={8}
						method={() => this.props.method(8)}
						value={this.props.value[8]}
					/>
				</div>
			</div>
		);
	}
}
