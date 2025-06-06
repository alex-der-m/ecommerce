import React from 'react';
import ProductForm from '../ProductForm';


const Admin = () => {
  return (
    <div className="container py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Panel de Administración</h2>
        <p className="text-muted text-center">
          Aquí podrás gestionar los cursos, revisar pedidos o actualizar información del sitio.
        </p>

        <div className="mt-5 mb-4">
          <h4 className="mb-3">Agregar nuevo producto</h4>
          <ProductForm />
        </div>

        <div className="row mt-5">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Gestión de Cursos</h5>
                <p className="card-text">Agregar, editar o eliminar cursos.</p>
                <button className="btn btn-primary" disabled>
                  Próximamente
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Pedidos</h5>
                <p className="card-text">Ver pedidos realizados por los usuarios.</p>
                <button className="btn btn-primary" disabled>
                  Próximamente
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted mt-5" style={{ fontSize: '0.9rem' }}>
          * Esta sección está en desarrollo.
        </p>
      </div>
    </div>
  );
};

export default Admin;