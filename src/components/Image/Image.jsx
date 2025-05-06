import React from "react";
import stules from "./styles.module.css";

function Image({ image }) {
	return (
		<div className={stules.wrapper}>
			{
				image
					? <img src={image} alt="news" className={stules.image} />
					: null
			}
		</div>
	);
}

export default Image;
