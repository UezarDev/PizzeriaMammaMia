import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Cart from './components/Cart';

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
			case "cart":
				return <Cart onPageChange={setCurrentPage}/>;
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
