import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = {}, isEdit = false, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    video: ''
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        video: initialData.video || ''
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.video) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const parsedProduct = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock)
    };

    onSubmit(parsedProduct);

    if (!isEdit) {
      setForm({ name: '', price: '', stock: '', video: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
      <h4 className="mb-3">{isEdit ? 'Editar Curso' : 'Agregar Nuevo Curso'}</h4>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre del Curso</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio (USD)</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="video" className="form-label">URL del Video (YouTube embed)</label>
        <input
          type="text"
          className="form-control"
          name="video"
          value={form.video}
          onChange={handleChange}
          required
        />
        <div className="form-text">
          Ejemplo: https://www.youtube.com/embed/ID_DEL_VIDEO
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Guardar Cambios' : 'Agregar Curso'}
        </button>

        {isEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;