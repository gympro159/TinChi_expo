import React, { useState } from "react";
import { Image, View, Text, ImageBackground, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
// import Categories from "./screens/Categories";
// import Category from "./screens/Category";
// import Cart from "./screens/Cart";
// import Order from "./screens/Order";
// import Setting from "./screens/Setting";

//Account
import UserProfileStackScreen from "./screens/Account/UserProfile";
import ChangePasswordStackScreen from "./screens/Account/ChangePassword";
import LogoutStackScreen from "./screens/Account/Logout";

//General Functions
import NewsStackScreen from "./screens/GeneralFunctions/News";
import TimeTableStackScreen from "./screens/GeneralFunctions/TimeTable";
import MessageStackScreen from "./screens/GeneralFunctions/Message";

//Statistics
import HistoryOfStudyingStackScreen from "./screens/Statistics/HistoryOfStudying";
import StudyResultStackScreen from "./screens/Statistics/StudyResult";
import ConductStackScreen from "./screens/Statistics/Conduct";

//Studyinh
import ModulesStackScreen from "./screens/Studying/Modules";
import RegisteredCoursesStackScreen from "./screens/Studying/RegisteredCourses";
import ScheduleOfExamStackScreen from "./screens/Studying/ScheduleOfExam";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

// const CategoriesName = route.params;
// const CategoriesStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// const CategoriesStackScreen = () => {
//   return(
//     <CategoriesStack.Navigator>
//       <CategoriesStack.Screen
//         name="Categories"
//         component={Categories}
//         options={{ headerTitleAlign: "center" }}
//       />
//       <CategoriesStack.Screen
//         name="Category"
//         component={Category}
//         options={({ route }) => ({ title: route.params.categoryName, headerTitleAlign: "center" })}
//       />
//     </CategoriesStack.Navigator>
//   );
// }

const AccountTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Lý lịch cá nhân"
        component={UserProfileStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/profile.png")} />
        }}
      />
      <Tab.Screen
        name="Đổi mật khẩu"
        component={ChangePasswordStackScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require("./assets/changePass.png")} />
          )
        }}
      />
      <Tab.Screen
        name="Đăng xuất"
        component={LogoutStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/logout.png")} />
        }}
      />
    </Tab.Navigator>
  );
};

const GeneralFunctionsTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tin tức - Thông báo"
        component={NewsStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/book.png")} />
        }}
      />
      <Tab.Screen
        name="Thời khóa biểu"
        component={TimeTableStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/calendar.png")} />
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={MessageStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/message.png")} />
        }}
      />
    </Tab.Navigator>
  );
};

const StatisticsTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="L.Sử Q.Trình học"
        component={HistoryOfStudyingStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/book.png")} />
        }}
      />
      <Tab.Screen
        name="Kết quả học tập"
        component={StudyResultStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/calendar.png")} />
        }}
      />
      <Tab.Screen
        name="Kết quả rèn luyện"
        component={ConductStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/message.png")} />
        }}
      />
    </Tab.Navigator>
  );
};

const StudyingTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Đăng ký học tập"
        component={ModulesStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/book.png")} />
        }}
      />
      <Tab.Screen
        name="Lớp H.Phần đã đăng ký"
        component={RegisteredCoursesStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/calendar.png")} />
        }}
      />
      <Tab.Screen
        name="Lịch thi"
        component={ScheduleOfExamStackScreen}
        options={{
          tabBarIcon: () => <Image source={require("./assets/message.png")} />
        }}
      />
    </Tab.Navigator>
  );
};

DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <ImageBackground
        source={require("./assets/bg-avatar.jpg")} b //?? 
        style={{ width: undefined, padding: 16}}
      >
        <Image source={require("./assets/avatar.jpg")} style={styles.profile} />
        <Text style={styles.name}>{props.name}</Text>
      </ImageBackground>
      <DrawerItemList {...props} />
      <View style={{ alignItems: "center", marginVertical: 300}}>
        <Image source={require("./assets/logo.png")} />
      </View>
    </DrawerContentScrollView>
  );
};

export default AppNavigator = props => {
  var name = props.route.name;
  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} name={name}/>}>
        <Drawer.Screen
          name="Các chức năng chung"
          component={GeneralFunctionsTabScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome style={{ marginLeft: 10 }} name="newspaper-o" size={30} />
            )
          }}
        />
        <Drawer.Screen
          name="Tài khoản"
          component={AccountTabScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome style={{ marginLeft: 10 }} name="id-card" size={30} />
            )
          }}
        />
        <Drawer.Screen
          name="Kế hoạch học tập"
          component={StudyingTabScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome style={{ marginLeft: 10 }} name="id-card" size={30} />
            )
          }}
        />
        <Drawer.Screen
          name="Số liệu - Tổng hợp"
          component={StatisticsTabScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome style={{ marginLeft: 10 }} name="id-card" size={30} />
            )
          }}
        />
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF"
  },
  name : {
    color: '#000',
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8
  }
});
