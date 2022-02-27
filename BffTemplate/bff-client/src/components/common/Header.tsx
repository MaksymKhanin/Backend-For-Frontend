import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
	return (
		<nav>
			<NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink> |{" "}
			<NavLink to="/profile">Profile</NavLink> |{" "}
			<NavLink to="/logout">Logout</NavLink>
		</nav>
	);
}

export default Header;
