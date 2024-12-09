import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot, updateSpot } from '../../store/spots';

function SpotForm({ initialData = {}, isUpdate, onSuccess }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    country: initialData.country || '',
    lat: initialData.lat || '',
    lng: initialData.lng || '',
    description: initialData.description || '',
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
      {Object.keys(form).map((field) => (
        <label key={field}>
          {field[0].toUpperCase() + field.slice(1)}
          <input
            type={
              ['price', 'lat', 'lng'].includes(field) ? 'number' : 'text'
            }
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            placeholder={`Enter ${field}`}
          />
        </label>
      ))}
      <button type="submit">
        {isUpdate ? 'Update Spot' : 'Create Spot'}
      </button>
    </form>
  );
}

export default SpotForm;