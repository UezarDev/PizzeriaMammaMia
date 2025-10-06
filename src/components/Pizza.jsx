import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import { formatCurrency } from '../utils/formatCurrency';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { pizzas as fallbackPizzas } from '../utils/pizzas.js';

const Pizza = ({ addToCart }) => {
	const params = useParams();
	const id = params.id || 'p001';
	const [pizza, setPizza] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [adding, setAdding] = useState(false);
	const timerRef = useRef(null);

  useEffect(() => {
		let mounted = true;
		const fetchPizzas = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
				if (response.ok) {
					const data = await response.json();
					// If backend returned a valid object with an id, use it
					if (data && (data.id || data._id || typeof data === 'object')) {
						if (mounted) setPizza(data);
						return;
					}
				}

				// Fallback: try to find the pizza in the local list by id (case-insensitive)
				const found = fallbackPizzas.find(
					(p) => p.id && p.id.toString().toLowerCase() === id.toString().toLowerCase()
				);
				if (mounted) setPizza(found || null);
			} catch (error) {
				console.error('Error al obtener las pizzas:', error);
				const found = fallbackPizzas.find(
					(p) => p.id && p.id.toString().toLowerCase() === id.toString().toLowerCase()
				);
				if (mounted) setPizza(found || null);
			}
		};

		fetchPizzas();
		return () => {
			mounted = false;
		};
  }, [id]);

  if (!pizza) {
    return <p className="m-4">Cargando...</p>;
  }

  return (
		<div className="container d-flex align-items-center py-4">
			{/* Left: Image */}
			<div className="col-md-6 d-flex align-items-center justify-content-center">
				<img
					src={pizza.img}
					className="img-fluid rounded-start"
					alt={pizza.name}
					style={{ maxHeight: 520, objectFit: "cover", width: "100%" }}
				/>
			</div>

			<div className="card bg-dark text-light mx-auto" style={{ maxWidth: 1100 }}>
				{/* Right: Top actions + Bottom description/ingredients */}
				<div className="card-body rounded-start d-flex flex-column h-100">
					{/* Top-right actions */}
					<div>
						<div className="d-flex flex-column justify-content-between align-items-start">
							<h2 className="card-title mb-0 text-capitalize">Pizza {pizza.name}</h2>
							<div className="fs-3 fw-bold">{formatCurrency(pizza.price)}$</div>
						</div>

						<div className="mt-3 d-flex align-items-center justify-content-between gap-3">
							<button
								className="btn btn-primary me-2"
								onClick={() => {
									if (adding) return;
									setAdding(true);
									addToCart?.(pizza, quantity);
									timerRef.current = setTimeout(() => setAdding(false), 700);
								}}
								disabled={adding}
								aria-disabled={adding}>
								{adding && (
									<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
								)}
								Añadir al carrito
							</button>

							<div className="me-3">
								<Counter id={id} value={quantity} onChange={(i, v) => setQuantity(v)} />
							</div>
						</div>
					</div>
					{/* Bottom-right description & ingredients */}
					<div className="mt-4 mt-md-auto">
						<hr className="border-light border-opacity-25" />
						<h5>Descripción</h5>
						<p className="text-light-50">{pizza.desc}</p>
						<hr className="border-light border-opacity-25" />
						<h5 className="mt-3">Ingredientes</h5>
						<ul className="list-group list-group-flush">
							{(pizza.ingredients || []).map((ingredient, index) => (
								<li key={index} className="list-group-item bg-transparent border-primary text-light">
									{ingredient}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pizza;
