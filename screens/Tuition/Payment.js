import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

const Payment = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
        Chức năng này đang phát triển!
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default PaymentStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerTitleAlign: "center",
          title: "Nộp học phí trực tuyến",
          headerLeft: () => (
            <FontAwesome
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
