import React, { useState, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import AppNavigator from "./AppNavigator";
import Loading from "./screens/Loading";

const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));

export default App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  if (isLoading) return <Loading />;

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
