import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	display: {},
	card: {
		textAlign: "center",
		width: 200,
		height: 200
	},

	type: {
		display: "inline-block"
	}
});

export default function Timer(props) {
	const classes = useStyles();
	let clock;
	if (props.seconds == 0) {
		clock = {
			position: "absolute",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			display: "none"
		};
	} else {
		clock = {
			position: "absolute",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0
		};
	}
	let timeup = {
		position: "absolute",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0
	};
	return (
		<Card className={classes.card}>
			<div
				style={{
					width: "100%",
					height: 0,
					paddingBottom: "75%",
					position: "relative"
				}}
			>
				<iframe
					src="https://giphy.com/embed/ZO91JK6HBDeCMQXkK4"
					style={timeup}
					frameBorder="0"
				/>

				<iframe
					src="https://giphy.com/embed/xFmuT64Jto3mRO4w3G"
					style={clock}
					frameBorder="0"
				/>
			</div>
			<CardActionArea>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="h2"
						className={classes.type}
					>
						{props.seconds != 0 ? props.seconds + " Seconds" : "Time Up"}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
