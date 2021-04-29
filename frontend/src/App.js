import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import { ReviewsContextProvider } from "./context/ReviewsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <ReviewsContextProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route
                path="/restaurants/:id/update"
                component={UpdatePage}
                exact
              />
              <Route
                path="/restaurants/:id"
                component={RestaurantDetailsPage}
                exact
              />
            </Switch>
          </Router>
        </div>
      </ReviewsContextProvider>
    </RestaurantsContextProvider>
  );
}

export default App;
