import React, { useState, useReducer, useEffect, createContext } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { connect } from "react-redux";
import * as Font from 'expo-font';
import { FontAwesome } from "@expo/vector-icons";
import {
  actPostAccountRequest,
  actDeleteToken,
  actFetchStudentProfileRequest,
  actUserLogout
} from "./actions/index";
import Login from "./screens/Login/Login";
import AppDraw from "./AppDraw";

export const AuthContext = createContext();

function AppNavigator({ dataToken, postAccount, deleteToken, actUserLogout }) {
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

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...FontAwesome.font,
    });
  }, [])

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
        actUserLogout();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar backgroundColor="#282C34" barStyle="default" />
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
    actUserLogout: () => {
      dispatch(actUserLogout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
