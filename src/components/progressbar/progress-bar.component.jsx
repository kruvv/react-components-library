import React from "react";
import "./progress-bar.styles.scss";

const ProgressBar = props => {
	const { visible, width } = props;
	const style = { width: width};
	const classes =
		"progress-bar MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-indeterminate " +
		(visible ? " progress-bar-visible" : " progress-bar-hidden");
	return (
		<div className={classes} role="progressbar" style={style}>
			<div className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Indeterminate"></div>
			<div className="MuiLinearProgress-bar MuiLinearProgress-bar2Indeterminate MuiLinearProgress-barColorPrimary"></div>
		</div>
	);
};

export default ProgressBar;
