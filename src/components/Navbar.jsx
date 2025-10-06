import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const Navbar = ({ token, setToken, total }) => {

  return (
		<nav
			className="navbar sticky-top navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center"
			style={{ minHeight: "56px" }}>
			<span className="navbar-brand mb-0 h1">Pizzería Mamma Mia!</span>
			<div className="d-none d-md-flex justify-content-between flex-grow-1 gap-2">
				<div className="d-flex gap-2">
					<Link className="btn btn-outline-primary btn-sm" to="/PizzeriaMammaMia/">
						🍕 Home
					</Link>
					{token ? (
						<>
							<Link className="btn btn-outline-primary btn-sm" to="/PizzeriaMammaMia/profile">
								🔓 Profile
							</Link>
								<button className="btn btn-outline-primary btn-sm" onClick={() => setToken(false)}>
									🔒 Logout
								</button>
						</>
					) : (
						<>
							<Link className="btn btn-outline-primary btn-sm" to="/PizzeriaMammaMia/login">
								🔐 Login
							</Link>
							<Link className="btn btn-outline-primary btn-sm" to="/PizzeriaMammaMia/register">
								🔐 Register
							</Link>
						</>
					)}
				</div>
					{total === 0 ? (
						<button className="btn btn-outline-primary btn-sm" disabled>
							🛒 Empty
						</button>
					) : (
						<Link className="btn btn-outline-primary btn-sm" to="/PizzeriaMammaMia/cart">
							🛒 Total: ${formatCurrency(total)}
						</Link>
					)}
			</div>
			<div className="d-flex d-md-none align-items-end gap-2">
				<button
					className="btn btn-outline-primary btn-sm"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasNavbar"
					aria-controls="offcanvasNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>
			<div
				className="offcanvas offcanvas-end bg-dark text-light"
				tabIndex="-1"
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasNavbarLabel">
						Pizza Menu
					</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<div className="d-flex flex-column gap-2">
						<Link className="btn btn-outline-primary" to="/PizzeriaMammaMia/">
							🍕 Home
						</Link>
						{token ? (
							<>
								<Link className="btn btn-outline-primary" to="/PizzeriaMammaMia/profile">
									🔓 Profile
								</Link>
								<button className="btn btn-outline-primary" onClick={() => setToken(false)}>
									🔒 Logout
								</button>
							</>
						) : (
							<>
								<Link className="btn btn-outline-primary" to="/PizzeriaMammaMia/login">
									🔐 Login
								</Link>
								<Link className="btn btn-outline-primary" to="/PizzeriaMammaMia/register">
									🔐 Register
								</Link>
							</>
						)}
						{total === 0 ? (
							<button className="btn btn-outline-primary" disabled>
								🛒 Empty
							</button>
						) : (
							<Link className="btn btn-outline-primary" to="/PizzeriaMammaMia/cart">
								🛒 Total: ${formatCurrency(total)}
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
