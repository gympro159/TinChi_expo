import React, { useState, useReducer, useEffect, createContext } from "react";
import Axios from "axios";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  actPostAccountRequest,
  actDeleteToken,
  actFetchStudentProfileRequest,
} from "./actions/index";
import Login from "./screens/Login/Login";
import AppDraw from "./AppDraw";

export const AuthContext = createContext();
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

function AppNavigator({ dataToken, postAccount, deleteToken }) {
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

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem("userToken");
  //     } catch (e) {
  //       // Restoring token failed
  //     }
  //     // console.log("bootstrapAsync -> userToken", userToken)
  //     dispatch({ type: "RESTORE_TOKEN", token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        const dp = (dttoken) => {
          return dispatch({ type: "SIGN_IN", token: dttoken });
        };
        postAccount(data, dp);
        //console.log("postAccount");
      },
      signOut: () => {
        AsyncStorage.removeItem("userToken");
        deleteToken();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      {!auth.userToken || Object.keys(auth.userToken).length === 0 ? (
        <Login />
      ) : (
        <AppDraw />
      )}
    </AuthContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    studentProfile: state.studentProfile,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    postAccount: (account, dp) => {
      dispatch(actPostAccountRequest(account, dp));
    },
    deleteToken: () => {
      dispatch(actDeleteToken());
    },
    fetchStudentProfile: (dataToken) => {
      dispatch(actFetchStudentProfileRequest(dataToken));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
