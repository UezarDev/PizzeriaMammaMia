import React from 'react';

export default function Counter({ id, value = 1, onChange }) {
  // Controlled counter: value comes from parent, onChange called only on user actions
  const increment = () => onChange?.(id, value + 1);
  const decrement = () => onChange?.(id, Math.max(0, value - 1));

  return (
    <div className="d-flex align-items-center">
      <button className="btn btn-sm btn-outline-danger me-2 aspect-ratio-1x1" onClick={decrement} aria-label="decrease">−</button>
      <div className="fw-bold text-center px-2 fs-5">{value}</div>
      <button className="btn btn-sm btn-outline-primary ms-2 aspect-ratio-1x1" onClick={increment} aria-label="increase">+</button>
    </div>
  );
}
