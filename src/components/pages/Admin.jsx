import React, { useState } from 'react';
import ProductForm from '../ProductForm';
import { useProducts } from '../../context/ProductsContext';

const Admin = () => {
  const { products, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        alert('Producto eliminado correctamente');
      } catch (error) {
        alert('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Panel de Administración</h2>
        <p className="text-muted text-center">
          Aquí podrás gestionar los cursos, revisar pedidos o actualizar información del sitio.
        </p>

        <div className="mt-5 mb-4">
          <h4 className="mb-3">{editingProduct ? 'Editar producto' : 'Agregar nuevo producto'}</h4>
          <ProductForm
            productToEdit={editingProduct}
            onFinish={() => setEditingProduct(null)}
          />
        </div>

        <hr className="my-5" />

        <h4>Productos actuales</h4>
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>${prod.price}</td>
                    <td>{prod.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => setEditingProduct(prod)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay productos cargados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-muted mt-5" style={{ fontSize: '0.9rem' }}>
          * Esta sección está en desarrollo.
        </p>
      </div>
    </div>
  );
};

export default Admin;