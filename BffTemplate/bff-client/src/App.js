import React from "react";
import AboutPage from "./components/AboutPage";
import Header from "./components/common/Header";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import { AuthProvider, RequireAuth } from "./authentication/useAuth";

function App() {
	return (
		<>
			<ToastContainer autoClose={3000} hideProgressBar />
			<Header />
			<AuthProvider>
				<div className="App">
					<header className="App-header">
						<Routes>
							<Route path="*" element={<NotFoundPage />} />
							<Route path="/" element={<Home />} />
							<Route
								path="/profile"
								element={
									<RequireAuth>
										<Profile />
									</RequireAuth>
								}
							/>
							<Route
								path="/logout"
								element={
									<RequireAuth>
										<Logout />
									</RequireAuth>
								}
							/>
							<Route exact path="/about" element={<AboutPage />} />
						</Routes>
					</header>
				</div>
			</AuthProvider>
		</>
	);
}

export default App;
