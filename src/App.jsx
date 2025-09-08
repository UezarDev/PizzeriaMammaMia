import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Footer from './components/Footer';

function App() {
	const [currentPage, setCurrentPage] = useState("login"); // "home" | "login" | "register"
	const [token, setToken] = useState(false); // Cambia a true para simular usuario logueado

	const renderMain = () => {
		switch (currentPage) {
			case "login":
				return <Login onPageChange={setCurrentPage} onLoginSuccess={setToken} />;
			case "register":
				return <Register onPageChange={setCurrentPage} />;
			case "profile":
				return <Profile />;
			case "home":
			default:
				return <Home />;
		}
	};

	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<Navbar onPageChange={setCurrentPage} token={token} setToken={setToken} />
			<main className="flex-grow-1">{renderMain()}</main>
			<Footer />
		</div>
	);
}

export default App
