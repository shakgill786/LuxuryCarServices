import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot, editSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';

const SpotForm = ({ initialData = {}, isEdit = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    previewImage: initialData.previewImage || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(editSpot(initialData.id, formData));
    } else {
      await dispatch(createSpot(formData));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Preview Image URL
        <input
          type="url"
          name="previewImage"
          value={formData.previewImage}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{isEdit ? 'Update Spot' : 'Create Spot'}</button>
    </form>
  );
};

export default SpotForm;