import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import Subject from "./../Subject/Subject";

const Modules = ({ navigation }) => {
  return (
    <View>
      <Text>User Profile</Text>
      <Button
        title="Thay đổi lý lịch"
        onPress={() => navigation.push("Subject")}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default ModulesStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={{
          headerTitleAlign: "center",
          title: "Đăng ký học tập",
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
      <Stack.Screen
        name="Subject"
        component={Subject}
        options={{ headerTitleAlign: "center", title: "Thông tin học phần" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
