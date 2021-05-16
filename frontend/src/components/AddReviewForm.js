import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReviewForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: "",
    review: "",
  });
  // random psuh

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.post(`/${id}/add-review`, {
      name: reviewData.name,
      review: reviewData.review,
      rating: reviewData.rating,
    });

    history.push("/");
    history.push(location.pathname);
    // console.log(response);
  };
  return (
    <form>
      <div className="mb-3 row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            value={reviewData.name}
            onChange={(e) =>
              setReviewData({ ...reviewData, name: e.target.value })
            }
            type="text"
            className="form-control"
            id="name"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="rating" className="col-sm-2 col-form-label">
          Rating
        </label>
        <div className="col-sm-10">
          <input
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({ ...reviewData, rating: e.target.value })
            }
            type="number"
            className="form-control"
            id="rating"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="Review" className="col-sm-2 col-form-label">
          Review
        </label>
        <div className="col-sm-10">
          <textarea
            value={reviewData.review}
            onChange={(e) =>
              setReviewData({ ...reviewData, review: e.target.value })
            }
            className="form-control"
            id="Review"
          />
        </div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          onClick={handleReviewSubmit}
          className="btn btn-primary "
        >
          Add Review
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
