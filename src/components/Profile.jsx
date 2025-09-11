import "./Form.css";

const Profile = () => {
  return (
		<div className="center-container">
			<div className="form-root bg-dark text-light">
				<h2 className="mb-3">Perfil</h2>
				<div className="d-flex gap-3">
					<img
						src="src/assets/empty-profile-icon.webp"
						alt="Empty Profile Icon"
						className="rounded-circle img-fluid"
						style={{ width: "150px" }}
					/>
					<div>
						<h4>Nombre Apellido</h4>
						<p>Domicilio</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
