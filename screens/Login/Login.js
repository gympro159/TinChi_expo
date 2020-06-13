import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Input, Button, Text } from "react-native-elements";
// import Loader from 'react-native-modal-loader';
import { AuthContext } from "./../../AppNavigator";

const { width, height } = Dimensions.get("window");

export default Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  return (
    <View>
      {/* <Loader loading={loading} color="#000"/> */}
      <ImageBackground
        style={{ width, height: height * 1.1 }}
        source={require("./../../assets/bg-avatar.jpg")}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("./../../assets/cems-logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.container}>
          <Text h4>Sinh viên</Text>
          <Input
            disabled={loading}
            onChangeText={setUsername}
            value={username}
            style={styles.textInput}
            placeholder="Mã sinh viên"
            leftIcon={
              <FontAwesome
                name="user"
                size={24}
                color="#000"
                style={{ marginRight: 10 }}
              />
            }
            returnKeyType = { "next" }
            onSubmitEditing={() => { secondTextInput.focus(); }}
            blurOnSubmit={false}
          />
          <Input
            ref={(input) => { secondTextInput = input; }}
            disabled={loading}
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            placeholder="Mật khẩu"
            leftIcon={
              <FontAwesome
                name="lock"
                size={24}
                color="#000"
                style={{ marginRight: 10 }}
              />
            }
            secureTextEntry
          />
          <Button
            title="Đăng nhập"
            buttonStyle={styles.buttonSubmit}
            disabledStyle={styles.buttonSubmitDisabled}
            onPress={() => {
              setLoading(true);
              if (username === "" || password === "") {
                Alert.alert(
                  "Thông báo",
                  "Mã sinh viên và Mật khẩu không được để trống",
                  [{ text: "OK", onPress: () => setLoading(false) }],
                  { cancelable: false }
                );
              } else {
                const setLoad = () => {
                  Alert.alert(
                    "Thông báo",
                    "Sai Mã sinh viên hoặc Mật khẩu",
                    [
                      {
                        text: "OK",
                        onPress: () => setLoading(false),
                      },
                    ],
                    { cancelable: false }
                  );
                };
                signIn({ username, password, setLoad });
              }
            }}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 300,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    opacity: 0.8,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    borderRadius: 20,
  },
  logoContainer: {
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  textHeader: {
    color: "#000",
    fontSize: 17,
    alignItems: "flex-start",
    marginVertical: 10,
    marginLeft: 20,
  },
  textInput: {
    width: width * 0.9,
    height: 90,
    marginBottom: 20,
    color: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#000",
  },
  buttonSubmit: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: 130,
    backgroundColor: "#0080ff"
  },
  buttonSubmitDisabled: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: 130,
    backgroundColor: "#0080ff"
  },
});

// const Stack = createStackNavigator();

// export default LoginScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Login"
//         component={LoginConnect}
//         options={{
//           headerShown: false,
//           headerTitleAlign: "center",
//           title: "Đăng nhập",
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
