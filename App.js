import React, { useState, useEffect } from "react";
import AppNavigator from "./AppNavigator";
import Loading from "./Loading";

export default App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false);
    }, 3000)
  }, [])

  if (isLoading) return <Loading/>;

  return <AppNavigator />;
};
