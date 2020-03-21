import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";

const TimeTable = ({ navigation }) => {
  return (
    <View>
      <Text>TimeTable</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default TimeTableStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TimeTable"
        component={TimeTable}
        options={{
          headerTitleAlign: "center",
          title: "Thời khóa biểu",
          headerLeft: () => (
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
              name="bars"
              size={30}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};
