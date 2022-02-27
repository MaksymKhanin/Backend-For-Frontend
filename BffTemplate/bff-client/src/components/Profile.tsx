import useAuth from "../authentication/useAuth";

function Profile() {
	const { user } = useAuth();

	return (
		<>
			<div className="jumbotron">
				Profile
				<div>Display name: {user?.name}</div>
				<div>First name: {user?.firstName}</div>
				<div>Last name: {user?.lastName}</div>
				<div>Email: {user?.email}</div>
			</div>
		</>
	);
}

export default Profile;
