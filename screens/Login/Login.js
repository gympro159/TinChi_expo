import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { Input, Button, Text } from "react-native-elements";
import { AuthContext } from "./../../AppNavigator";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const [msv, setMsv] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <ImageBackground
        style={{ width, height }}
        source={require("./../../assets/bg-avatar.jpg")}
      >
        <View style={styles.container}>
          {/* <Text style={styles.textHeader}>Mã sinh viên:</Text> */}
          <Text h4>Sinh viên</Text>
          <Input
            onChangeText={setMsv}
            value={msv}
            style={styles.textInput}
            placeholder="Mã sinh viên"
            leftIcon={<FontAwesome name="user" size={24} color="#000" style={{marginRight: 5}}/>}
          />
          {/* <Text style={styles.textHeader}>Mật khẩu:</Text> */}
          <Input
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            placeholder="Mật khẩu"
            leftIcon={<FontAwesome name="key" size={24} color="#000" style={{marginRight: 5}}/>}
            secureTextEntry
          />
          <Button title="Đăng nhập" buttonStyle={styles.buttonSubmit} onPress={() => signIn({ msv, password })} />
        </View>
      </ImageBackground>
    </View>
  );
};

const Stack = createStackNavigator();

export default LoginScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitleAlign: "center",
          title: "Đăng nhập"
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    marginBottom: 300,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    opacity: 0.8,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    borderRadius: 20
  },
  textHeader: {
    color: "#000",
    fontSize: 17,
    alignItems: "flex-start",
    marginVertical: 10,
    marginLeft: 20
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
    borderRadius: 10
  }
});
