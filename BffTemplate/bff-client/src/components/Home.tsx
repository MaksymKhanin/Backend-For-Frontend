import useAuth from "../authentication/useAuth";
import PayloadUploadPage from "./PayloadUploadPage";

function Home() {
	const { authenticated, login } = useAuth();

	const handleLogin = async () => {
		await login("/");
	};

	if (!authenticated) {
		return (
			<p>
				<button onClick={handleLogin}>Log in</button>
			</p>
		);
	}

	if (authenticated) {
		return (
			<>
				<div className="jumbotron">
					<h1>Select a file</h1>
					<PayloadUploadPage />
				</div>
			</>
		);
	}
}

export default Home;
