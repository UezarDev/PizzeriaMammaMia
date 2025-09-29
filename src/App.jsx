import { useState } from 'react';
import { useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Pizza from './components/Pizza';

import { pizzaCart as initialCart } from "./utils/pizzas.js";


function App() {
	const [currentPage, setCurrentPage] = useState("login");
	const [token, setToken] = useState(false); // Cambia a true para simular usuario logueado
  const [items, setItems] = useState(() => initialCart.slice());
  const [currentPizzaId, setCurrentPizzaId] = useState("p001");

  const total = useMemo(() => items.reduce((acc,item)=>acc+item.price*(item.count??1),0), [items]);

	const addToCart = (pizzaToAdd, qty = 1) => {
		if (!pizzaToAdd || !pizzaToAdd.id) return;
		setItems((prev) => {
			const idx = prev.findIndex(
				(it) => it.id && it.id.toString().toLowerCase() === pizzaToAdd.id.toString().toLowerCase()
			);
			if (idx !== -1) {
				return prev.map((it, i) => (i === idx ? { ...it, count: (it.count ?? 1) + qty } : it));
			}
			return [
				...prev,
				{
					id: pizzaToAdd.id,
					name: pizzaToAdd.name,
					price: pizzaToAdd.price,
					count: qty,
					img: pizzaToAdd.img,
				},
			];
		});
	};

	const renderMain = () => {
		switch (currentPage) {
			case "login":
				return <Login onPageChange={setCurrentPage} onLoginSuccess={setToken} />;
			case "register":
				return <Register onPageChange={setCurrentPage} />;
			case "profile":
				return <Profile />;
			case "cart":
				return <Cart items={items} setItems={setItems} onPageChange={setCurrentPage}/>;
			case "pizza":
				return <Pizza id={currentPizzaId} addToCart={addToCart} />;
					case "home":
					default:
						return (
							<Home
								onPageChange={setCurrentPage}
								setCurrentPizzaId={setCurrentPizzaId}
								addToCart={addToCart}
							/>
						);
		}
	};

	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<Navbar onPageChange={setCurrentPage} token={token} setToken={setToken} total={total} />
			<main className="flex-grow-1">{renderMain()}</main>
			<Footer />
		</div>
	);
}

export default App
