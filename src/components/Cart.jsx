import React, { useState } from "react";
import "./Cart.css";
import { formatCurrency } from "../utils/formatCurrency";
import { pizzaCart } from "../utils/pizzas.js";

function Counter({ id, initial = 1, onChange }) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount((prev) => {
      const next = prev + 1;
      onChange?.(id, next);
      return next;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const next = Math.max(0, prev - 1);
      onChange?.(id, next);
      return next;
    });
  };

  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-sm btn-outline-danger me-2" onClick={decrement} aria-label="decrease">−</button>
      <div className="fw-bold text-center px-2 fs-5">{count}</div>
      <button className="btn btn-sm btn-outline-primary ms-2" onClick={increment} aria-label="increase">+</button>
    </div>
  );
}

function Cart({ onPageChange }) {
	// initialize counts from pizzaCart
	const [items, setItems] = useState(() => pizzaCart.slice());
	const [counts, setCounts] = useState(() => Object.fromEntries(pizzaCart.map((it) => [it.id, it.count ?? 1])));

	const handleCountChange = (id, value) => {
		if (value <= 0) {
			handleDelete(id);
			return;
		}
		setCounts((prev) => ({ ...prev, [id]: value }));
	};

	const total = items.reduce((acc, item) => acc + item.price * (counts[item.id] ?? item.count ?? 1), 0);

	const handleDelete = (idToRemove) => {
		setItems((prev) => prev.filter((item) => item.id !== idToRemove));
		setCounts((prev) => {
			const copy = { ...prev };
			delete copy[idToRemove];
			return copy;
		});
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

							<h6 className="card-subtitle mb-2">Total a pagar:</h6>
							<p className="card-text display-6 fw-bold">{formatCurrency(0)}</p>

							<button className="btn btn-primary w-100" onClick={() => onPageChange("home")}>
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
						const qty = counts[item.id] ?? item.count ?? 1;
						return (
							<div className="card mb-4 custom-card bg-dark text-light" key={item.id}>
								<div className="floating-img-wrapper">
									<img src={item.img} className="floating-img" alt={item.name} />
								</div>

								<div className="row g-0 align-items-end justify-content-center">
									<div className="col-4 col-xl-3"></div>
									<div className="col-8 col-xl-6">
										<div className="card-body w-100">
											<h5 className="card-title mb-1">Pizza {item.name}</h5>
											<p className="card-text mb-1">Precio: {formatCurrency(item.price)}</p>
										</div>
									</div>
									<div className="col-4 d-xl-none"></div>
									<div className="col-8 col-xl-3 d-flex justify-content-center mb-3">
										<div>
											<p className="card-text mb-1">Cantidad:</p>
											<Counter id={item.id} initial={qty} onChange={handleCountChange} />
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
