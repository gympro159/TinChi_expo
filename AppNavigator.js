import React, { useState, useReducer, createContext } from "react";
import Axios from "axios";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login/Login";
import AppDraw from "./AppDraw";

export const AuthContext = createContext();
const Stack = createStackNavigator();

export default AppNavigator = () => {
  const [fullName, setFullName] = useState("");
  // const [auth, setAuth] = useState({
  //   isLoading: true, isSignout: false, userToken: null
  // });
  const [auth, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }
      // console.log("bootstrapAsync -> userToken", userToken)
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        var student = [];
        await Axios.get(
          `http://5e88429a19f5190016fed3f8.mockapi.io/school/students`
        )
          .then((res) => {
            let students = [...res.data];
            student = students.filter(
              (std) =>
                std.maSinhvien === data.msv && std.password === data.password
            );
          })
          .catch((error) => console.log(error));

        if (student.length > 0) {
          //await AsyncStorage.setItem("userToken", `${student[0].maSinhvien}`);
          setFullName(student[0].fullName);
          dispatch({ type: "SIGN_IN", token: `${student[0].maSinhvien}` });
        } else {
          dispatch({ type: "SIGN_IN", token: null });
        }
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" })
      },
    }),
    []
  );
  // console.log(auth.userToken);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {auth.userToken == null? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="App"
              component={AppDraw}
              name={fullName}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
