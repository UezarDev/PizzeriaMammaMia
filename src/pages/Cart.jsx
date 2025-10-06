import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../components/Cart.css";
import { formatCurrency } from "../utils/formatCurrency";
import Counter from "../components/Counter";

function Cart({ items, setItems }) {

	const handleCountChange = (id, value) => {
		if (value <= 0) {
			setItems((prev) => prev.filter((it) => it.id !== id));
			return;
		}
		setItems((prev) => prev.map((it) => (it.id === id ? { ...it, count: value } : it)));
	};

  const total = items.reduce((acc, it) => acc + it.price * (it.count ?? 1), 0);

	const handleDelete = (idToRemove) => {
		setItems((prev) => prev.filter((item) => item.id !== idToRemove));
	};

	if (items.length === 0) {
		return (
			<div className="container d-flex flex-column align-items-center py-4">
				<h2 className="mb-4">Shopping Cart</h2>

				<div className="row w-100 justify-content-center">
					<div className="col-12 col-md-10 col-lg-8">
						<div className="card card-subtle bg-dark text-light p-3 text-center">
							<h5 className="card-title">Tu carrito está vacío</h5>
							<p className="card-text mb-3">Agrega pizzas para ver el total.</p>

							<hr className="border-light border-opacity-25" />

							<h6 className="card-subtitle mb-2">Nada que pagar.</h6>

							<button className="btn btn-primary w-100">
								Volver a la tienda
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container d-flex flex-column align-items-center py-4">
			<h2 className="mb-4">Shopping Cart</h2>
			<div className="row w-100 mb-3">
				<div className="col-12 col-md-8">
					{items.map((item) => {
						const qty = item.count ?? 1;
						return (
							<div className="card mb-4 custom-card bg-dark text-light" key={item.id}>
								<div className="floating-img-wrapper btnimg">
									<Link to={`/PizzeriaMammaMia/pizza/${item.id}`}>
										<img src={item.img} className="floating-img" alt={item.name} style={{ cursor: "pointer" }} />
									</Link>
								</div>

								<div className="row g-0 align-items-end justify-content-center">
									<div className="col-4 col-xl-3"></div>
									<div className="col-8 col-xl-6">
										<div className="card-body w-100">
											<h5 className="card-title mb-1 text-capitalize">Pizza {item.name}</h5>
											<p className="card-text mb-1">Precio: {formatCurrency(item.price)}</p>
										</div>
									</div>
									<div className="col-4 d-xl-none"></div>
									<div className="col-8 col-xl-3 d-flex justify-content-center mb-3">
										<div>
											<p className="card-text mb-1">Cantidad:</p>
											<Counter id={item.id} value={qty} onChange={handleCountChange} />
										</div>
									</div>
								</div>

								<div className="card-footer text-light-subtle">Subtotal: {formatCurrency(item.price * qty)}</div>
							</div>
						);
					})}
				</div>

				<div className="col-12 col-md-4">
					<div className="card card-subtle bg-dark text-light p-3">
						<h5 className="card-title">Total a pagar:</h5>
						<p className="card-text display-6 fw-bold">{formatCurrency(total)}</p>
						<button className="btn btn-primary w-100">Proceder al pago</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
