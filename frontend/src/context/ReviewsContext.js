import { createContext, useState } from "react";

export const ReviewsContext = createContext();

export const ReviewsContextProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const addReviews = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        setReviews,
        addReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
