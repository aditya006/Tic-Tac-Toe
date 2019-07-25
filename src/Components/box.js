import React from "react";
import "./App.css";

function Box(props) {
	return (
		<div>
			<div className="box" onClick={props.method}>
				{props.value}
			</div>
		</div>
	);
}

export default Box;
