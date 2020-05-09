import React, { useState, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import appReducers from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import AppNavigator from "./AppNavigator";
import Loading from "./screens/Loading";

const store = createStore(appReducers, applyMiddleware(thunk));

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
