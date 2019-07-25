import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import "./App.css";
const useStyles = makeStyles({
	card: {
		textAlign: "center",
		width: 200,
		height: 200,
		boxShadow: "10px 10px 5px grey"
	},
	media: {
		height: 100,
		width: 200
	},
	type: {
		display: "inline-block"
	},
	score: {
		fontSize: 50,
		margin: 15
	}
});
export default function Player(props) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography
					gutterBottom
					variant="h4"
					component="h2"
					className={classes.type}
				>
					{props.name} Wins:
				</Typography>
				<Typography
					gutterBottom
					variant="h1"
					component="h2"
					className={classes.score}
				>
					{props.score}
				</Typography>
			</CardContent>
		</Card>
	);
}
