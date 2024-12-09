import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot, updateSpot } from '../../store/spots';

function SpotForm({ initialData = {}, isUpdate, onSuccess }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    city: initialData.city || '',
    state: initialData.state || '',
    price: initialData.price || '',
    previewImage: initialData.previewImage || '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      await dispatch(updateSpot(initialData.id, form));
    } else {
      await dispatch(createSpot(form));
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      {['name', 'city', 'state', 'price', 'previewImage'].map((field) => (
        <label key={field}>
          {field}
          <input
            type="text"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        </label>
      ))}
      <button type="submit">{isUpdate ? 'Update Spot' : 'Create Spot'}</button>
    </form>
  );
}

export default SpotForm;