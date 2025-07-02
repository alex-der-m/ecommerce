import React from 'react';
import { useCarrito } from '../../context/CarritoContext';

const MyCourses = () => {
  const { cart, progress, updateProgress } = useCarrito();

  if (cart.length === 0) {
    return <p className="text-center mt-5">No tienes cursos aún.</p>;
  }

  const handleChange = (id, v) => {
    const val = Math.min(Math.max(Number(v), 0), 100);
    updateProgress(id, val);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Mis Cursos</h2>
      <div className="row">
        {cart.map((c) => (
          <div key={c.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3">
              <h5>{c.name}</h5>
              <div className="mb-3">
                <label htmlFor={`prog-${c.id}`} className="form-label">
                  Progreso: {progress[c.id] || 0}%
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  id={`prog-${c.id}`}
                  value={progress[c.id] || 0}
                  onChange={(e) => handleChange(c.id, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;