import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const Navbar = props => {
	const { auth, profile } = props;
	//console.log(auth);
	let links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
	return (
		<div className="navbar-fixed">
			<nav className="nav-wrapper grey darken-3">
				<div className="container">
					<Link to="/" className="brand-logo brand-logo-position">
						Project Planner
					</Link>
					{isLoaded(auth) && links}
				</div>
			</nav>
		</div>
	);
};
//ovo {isLoaded(auth) && links} je nacin outputa cile komponente ako je spremljena u varijablu
//uz to isLoaded osigurava da se prvo inicijalizira FB da zakljuci jesmo li logirani ili ne prije nego prikaze navbar

const mapStateToProps = state => {
	console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps)(Navbar);
