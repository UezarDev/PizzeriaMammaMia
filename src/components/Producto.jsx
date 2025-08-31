const Producto = () => {
  const productName = "Producto 1";
  const myStyle = {fontSize:'12px', color: 'brown'}
  return (
    <>
      <h1 className="producto"> {productName} </h1>
      <p style={{fontSize: '12px', color: 'blue'}}>Operaciones matemática Suma: {2 + 2}</p>
      <p style={ myStyle }>Operaciones matemática Resta: {2 - 2}</p>
      <p>Operaciones matemática Multiplicación: {2 * 2}</p>
      <p>Operaciones matemática División: {2 / 2}</p>
      <p>Operaciones matemática Módulo: {2 % 2}</p>
    </>
  );
};

export default Producto;
