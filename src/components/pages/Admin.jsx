import React, { useState } from 'react';
import ProductForm from '../ProductForm';
import { useProducts } from '../../context/ProductsContext';
import Swal from 'sweetalert2';

const Admin = () => {
  const { products, deleteProduct, refreshProducts } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire('Eliminado', 'El producto fue eliminado correctamente.', 'success');
        refreshProducts();
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al eliminar el producto.', 'error');
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingProduct) {
        await fetch(`https://6822bc57b342dce8004f33a3.mockapi.io/productos/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        Swal.fire('Actualizado', 'El curso fue actualizado correctamente.', 'success');
      } else {
        await fetch(`https://6822bc57b342dce8004f33a3.mockapi.io/productos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        Swal.fire('Agregado', 'El curso fue agregado correctamente.', 'success');
      }

      setEditingProduct(null);
      refreshProducts();
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al guardar el curso.', 'error');
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
          <h4 className="mb-3">{editingProduct ? 'Editar curso' : 'Agregar nuevo curso'}</h4>
          <ProductForm
            initialData={editingProduct}
            isEdit={!!editingProduct}
            onSubmit={handleSubmit}
          />
        </div>

        <hr className="my-5" />

        <h4>Cursos actuales</h4>
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>${prod.price}</td>
                    <td>{prod.stock}</td>
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
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay cursos cargados.
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