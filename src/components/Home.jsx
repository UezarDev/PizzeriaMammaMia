import React, { useState, useEffect } from 'react';
import Header from './Header';
import CardPizza from './CardPizza';
import { pizzas as fallbackPizzas } from '../utils/pizzas.js';

const Home = ({ addToCart }) => {
	const [pizzas, setPizzas] = useState(null);

	useEffect(() => {
		let mounted = true;
		const fetchPizzas = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/pizzas");
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				const data = await response.json();
				if (mounted) {
					// if backend returns valid array use it, otherwise fall back
					if (Array.isArray(data) && data.length > 0) {
						setPizzas(data);
					} else {
						setPizzas(fallbackPizzas);
					}
				}
			} catch (error) {
				console.error("Error al obtener las pizzas:", error);
				if (mounted) setPizzas(fallbackPizzas);
			}
		};

		fetchPizzas();
		return () => {
			mounted = false;
		};
	}, []);

	if (!pizzas) {
		return <p className="m-4">Cargando...</p>;
	}

	return (
		<div>
			<Header />
			<div className="container my-4">
				<div className="row g-4">
					{pizzas.map((pizza) => (
						<div className="col-12 col-md-4" key={pizza.id}>
																		<CardPizza
													id={pizza.id}
													name={pizza.name}
													price={pizza.price}
													ingredients={pizza.ingredients}
													img={pizza.img}
													addToCart={addToCart}
												/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
