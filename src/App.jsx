import { useState } from 'react';
import { useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Pizza from './components/Pizza';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import { Routes, Route } from 'react-router-dom';

import { pizzaCart as initialCart } from "./utils/pizzas.js";


function App() {
	const [token, setToken] = useState(false); // Cambia a true para simular usuario logueado
	const [items, setItems] = useState(() => initialCart.slice());

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

	// Use react-router to render pages
	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<Navbar token={token} setToken={setToken} total={total} />
			<main className="flex-grow-1">
				<Routes>
					<Route path="/" element={<Home addToCart={addToCart} />} />
					<Route path="/cart" element={<Cart items={items} setItems={setItems} />} />
					<Route path="/pizza/:id" element={<Pizza addToCart={addToCart} />} />
					<Route path="/login" element={<Login onLoginSuccess={setToken} />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App
