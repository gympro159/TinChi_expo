import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import { AuthContext } from "./../../AppNavigator";

const Logout = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#0080ff",
        }}
        onPress={() => Alert.alert(
          'Đăng xuất',
          'Bạn xác nhận muốn đăng xuất?',
          [
            {text: 'OK', onPress: () => signOut()},
            {
              text: 'Cancel',
              style: 'cancel',
            }
          ],
          {cancelable: false},
        )}
      >
        Logout
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default LogoutStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          headerTitleAlign: "center",
          title: "Đăng xuất",
          headerLeft: () => (
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
              name="bars"
              size={30}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
