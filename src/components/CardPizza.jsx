import React, { useState, useRef, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import './CardPizza.css';

const CardPizza = ({ id, name, price, ingredients, img, onPageChange, setCurrentPizzaId, addToCart }) => {
	const [adding, setAdding] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);
  return (
		<div className="card rounded-4 h-100 shadow-sm pizza-card text-dark-subtle border-0 bg-dark text-light">
			{/* image */}
			<img src={img} alt={`Pizza ${name}`} style={{ height: 240, objectFit: "cover" }} />

			<div className="card-body px-0">
				{/* title + divider */}
				<div className="px-3 d-flex border-bottom border-light border-opacity-25">
					<h5 className="card-title text-capitalize">Pizza {name}</h5>
				</div>
				{/* ingredients */}
				<div>
					<div className="px-3 pt-1">
						<div className="text-center text-light-subtle mb-2 fs-5">Ingredientes:</div>
					</div>

					<ul
						className="list-unstyled d-flex flex-wrap gap-2 px-3 justify-content-center ingredients-list"
						aria-label={`Ingredientes de ${name}`}>
						{ingredients.map((ing, idx) => (
							<li key={`${id}-${idx}`}>
								<span className="badge rounded-pill bg-light text-dark ingredient-badge">
									<span role="img" aria-hidden="true">
										🍕
									</span>
									&nbsp;{ing}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			{/* price + actions */}
			<div className="card-footer p-2 border-light border-opacity-25">
				<div className="text-center mb-3">
					<h4 className="mb-0">
						Precio: <span className="fw-bold">${formatCurrency(price)}</span>
					</h4>
				</div>

				<div className="d-flex justify-content-between">
					<button
						className="btn btn-outline-primary btn-sm rounded-3"
						onClick={() => {
							onPageChange("pizza");
							setCurrentPizzaId(id);
						}}>
						Ver Más 👀
					</button>
															<button
																className="btn btn-outline-primary btn-sm rounded-3"
																onClick={() => {
																	if (adding) return;
																	setAdding(true);
																	addToCart?.({ id, name, price, img }, 1);
																	timerRef.current = setTimeout(() => setAdding(false), 700);
																}}
																disabled={adding}
																aria-disabled={adding}
															>
																{adding && (
																	<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
																)}
																Añadir 🛒
															</button>
				</div>
			</div>
		</div>
	);
};

export default CardPizza;
