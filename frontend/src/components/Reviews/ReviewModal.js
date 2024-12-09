import React from 'react';
import ReviewForm from './ReviewForm';

function ReviewModal({ show, onClose, spotId }) {
  if (!show) return null;

  return (
    <div className="review-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <ReviewForm spotId={spotId} />
      </div>
    </div>
  );
}

export default ReviewModal;