import { useState } from 'react';
import { useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Pizza from './pages/Pizza.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';

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
					<Route path="/PizzeriaMammaMia/" element={<Home addToCart={addToCart} />} />
					<Route path="/PizzeriaMammaMia/cart" element={<Cart items={items} setItems={setItems} />} />
					<Route path="/PizzeriaMammaMia/pizza/:id" element={<Pizza addToCart={addToCart} />} />
					<Route path="/PizzeriaMammaMia/login" element={<Login onLoginSuccess={setToken} />} />
					<Route path="/PizzeriaMammaMia/register" element={<Register />} />
					<Route path="/PizzeriaMammaMia/profile" element={<Profile />} />
					<Route path="/PizzeriaMammaMia/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/PizzeriaMammaMia/404" replace />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App
