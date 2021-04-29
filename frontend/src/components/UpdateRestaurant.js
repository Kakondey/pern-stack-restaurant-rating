import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  let history = useHistory();
  const [data, setData] = useState({
    name: "",
    location: "",
    price_range: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setData({
        name: response.data.data.restaurant.name,
        location: response.data.data.restaurant.location,
        price_range: response.data.data.restaurant.price_range,
      });
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await RestaurantFinder.put(`/${id}`, {
      name: data.name,
      location: data.location,
      price_range: data.price_range,
    });
    history.push("/");
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="location" className="col-sm-2 col-form-label">
            Location
          </label>
          <div className="col-sm-10">
            <input
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              type="text"
              className="form-control"
              id="location"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="price" className="col-sm-2 col-form-label">
            Price Range
          </label>
          <div className="col-sm-10">
            <input
              value={data.price_range}
              onChange={(e) =>
                setData({ ...data, price_range: e.target.value })
              }
              type="number"
              className="form-control"
              id="price-range"
            />
          </div>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary "
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
