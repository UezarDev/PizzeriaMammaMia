import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import './CardPizza.css';

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
		<div className="card rounded-4 h-100 shadow-sm pizza-card border-0">
			{/* image */}
			<img src={img} alt={`Pizza ${name}`} style={{ height: 240, objectFit: "cover" }} />

			<div className="card-body px-0">
				{/* title + divider */}
				<div className="border-bottom px-3 d-flex">
					<h5 className="card-title">Pizza {name}</h5>
				</div>
				{/* ingredients */}
				<div>
					<div className="px-3 pt-1">
						<div className="text-center text-muted mb-2 fs-5">Ingredientes:</div>
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item text-secondary">
							<span role="img" aria-label="pizza">
								🍕
							</span>{" "}
							{ingredients.join(", ")}
						</li>
					</ul>
				</div>
			</div>
			{/* price + actions */}
			<div className="card-footer bg-white p-2">
				<div className="text-center mb-3">
					<h4 className="mb-0">
						Precio: <span className="fw-bold">${formatCurrency(price)}</span>
					</h4>
				</div>

				<div className="d-flex justify-content-between">
					<button className="btn btn-outline-primary btn-sm rounded-3">Ver Más 👀</button>
					<button className="btn btn-dark btn-sm rounded-3">Añadir 🛒</button>
				</div>
			</div>
		</div>
	);
};

export default CardPizza;
