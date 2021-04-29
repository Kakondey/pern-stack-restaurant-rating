import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurants = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: parseInt(priceRange),
      });
      addRestaurants(response.data.data.restaurant);
    } catch (err) {}

    setName("");
    setLocation("");
    setPriceRange("Price Range");
  };
  return (
    <div className="container-md">
      <form>
        <div className="row g-3">
          <div className="col">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="form-select "
              onChange={(e) => setPriceRange(e.target.value)}
              value={priceRange}
            >
              <option defaultValue>Price range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>

          <button onClick={handleSubmit} className="btn btn-primary col col-1">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
