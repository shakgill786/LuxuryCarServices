import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails, updateSpot } from '../../store/spots';

function EditSpotForm({ spotId, onClose }) {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.current);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setFormData(spot);
    }
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateSpot(spotId, formData));
    onClose();
  };

  if (!spot) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <label key={field}>
          {field[0].toUpperCase() + field.slice(1)}
          <input
            type={field === 'price' || field === 'lat' || field === 'lng' ? 'number' : 'text'}
            value={formData[field]}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
          />
        </label>
      ))}
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditSpotForm;