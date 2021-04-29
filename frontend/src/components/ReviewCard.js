import React from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <div
        className="card text-white bg-primary mb-3"
        style={{ maxWidth: "100%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>{review.name}</span>
          <span>
            <StarRating rating={review.rating} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text p-2">{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
