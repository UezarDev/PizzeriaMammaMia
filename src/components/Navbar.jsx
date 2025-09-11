import React from 'react';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const Navbar = ({ onPageChange, token, setToken }) => {
  const total = 25000; // Simulated cart total

  return (
		<nav
			className="navbar sticky-top navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center"
			style={{ minHeight: "56px" }}>
			<div className="d-flex align-items-center gap-2">
				<span className="navbar-brand mb-0 h1">Pizzería Mamma Mia!</span>
				<button className="btn btn-outline-primary btn-sm" onClick={() => onPageChange("home")}>
					🍕 Home
				</button>
				{token ? (
					<>
						<button className="btn btn-outline-primary btn-sm" onClick={() => onPageChange("profile")}>
							🔓 Profile
						</button>
						<button
							className="btn btn-outline-primary btn-sm"
							onClick={() => {
								setToken(false);
								onPageChange("login");
							}}>
							🔒 Logout
						</button>
					</>
				) : (
					<>
						<button className="btn btn-outline-primary btn-sm" onClick={() => onPageChange("login")}>
							🔐 Login
						</button>
						<button className="btn btn-outline-primary btn-sm" onClick={() => onPageChange("register")}>
							🔐 Register
						</button>
					</>
				)}
			</div>
			<button className="btn btn-outline-primary btn-sm" onClick={() => onPageChange("cart")}>
				🛒 Total: ${formatCurrency(total)}
			</button>
		</nav>
	);
};

export default Navbar;
