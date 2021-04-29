import { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantsList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    async function fetch() {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [setRestaurants]);

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1"> ({restaurant.count})</span>
      </>
    );
  };

  const handleDelete = async (id) => {
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {}
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const handleUpdate = (id) => {
    history.push(`/restaurants/${id}/update`);
  };
  return (
    <div className="container-md mt-4">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant, index) => {
              return (
                <tr key={index}>
                  <th
                    onClick={() => handleRestaurantSelect(restaurant.id)}
                    scope="row"
                    style={{ cursor: "pointer" }}
                  >
                    {restaurant.name}
                  </th>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(restaurant.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(restaurant.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
