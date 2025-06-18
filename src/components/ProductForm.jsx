import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';

const ProductForm = ({ productToEdit = null, onFinish }) => {
  const { addProduct, editProduct } = useProducts();

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        description: productToEdit.description || '',
        image: productToEdit.image || '',
      });
    } else {
      setForm({ name: '', price: '', description: '', image: '' });
      setErrors({});
      setSuccessMessage('');
    }
  }, [productToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = 'El precio debe ser un número mayor a 0.';
    if (!form.description || form.description.length < 10)
      newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!form.image.trim()) newErrors.image = 'La URL de imagen es obligatoria.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      if (productToEdit) {
        await editProduct(productToEdit.id, form);
        setSuccessMessage('Producto actualizado correctamente.');
      } else {
        await addProduct(form);
        setSuccessMessage('Producto agregado correctamente.');
        setForm({ name: '', price: '', description: '', image: '' });
      }

      setTimeout(() => {
        setSuccessMessage('');
        if (onFinish) onFinish();
      }, 1500);
    } catch (error) {
      console.error('Error al guardar producto:', error);
      const message =
        typeof error === 'string'
          ? error
          : error?.message || 'Ocurrió un error al guardar el producto.';
      setErrors({ general: message });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      {errors.general && <div className="alert alert-danger">{errors.general}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          name="price"
          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          value={form.price}
          onChange={handleChange}
          min="0.01"
          step="0.01"
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">URL de Imagen</label>
        <input
          type="text"
          name="image"
          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          value={form.image}
          onChange={handleChange}
        />
        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
      </div>

      <button type="submit" className="btn btn-success">
        {productToEdit ? 'Guardar cambios' : 'Agregar producto'}
      </button>
    </form>
  );
};

export default ProductForm;