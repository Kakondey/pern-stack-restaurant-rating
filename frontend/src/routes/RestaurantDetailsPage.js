import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReviewForm from "../components/AddReviewForm";
import ReviewCard from "../components/ReviewCard";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { ReviewsContext } from "../context/ReviewsContext";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const reviewsResponse = await RestaurantFinder.get(`/${id}/reviews`);

        setSelectedRestaurant(response.data.data.restaurant);
        setReviews(reviewsResponse.data.data.reviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    return () => {};
  }, [id, setSelectedRestaurant, setReviews]);

  return (
    <div className="container">
      <h1 className="font-weight-light display-4 text-center">
        {selectedRestaurant.name}
      </h1>
      <div className="display-9 text-center">
        <StarRating rating={selectedRestaurant.average_rating} />
        <span className="text-warning">
          {" "}
          {selectedRestaurant.count ? `(${selectedRestaurant.count})` : "(0)"}
        </span>
      </div>
      {selectedRestaurant && (
        <>
          <div className="row row-cols-3 mt-3">
            {reviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
          <div className="mt-3">
            <AddReviewForm />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
