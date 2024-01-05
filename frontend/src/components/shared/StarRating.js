"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          className={`${
            star <= rating ? "text-yellow-500" : "text-gray-500"
          } cursor-pointer`}>
          <FaStar size={20} />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
