import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<>
			<div>
				<h2>Page not found</h2>
				<p>
					<Link to="Home">Back to home</Link>
				</p>
			</div>
		</>
	);
}

export default NotFoundPage;
