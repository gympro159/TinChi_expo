import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AuthContext } from "./AppNavigator";
//Account
import UserProfileStackScreen from "./screens/Account/UserProfile";
import ChangePasswordStackScreen from "./screens/Account/ChangePassword";

//General Functions
import NewsStackScreen from "./screens/GeneralFunctions/News";
import TimeTableStackScreen from "./screens/GeneralFunctions/TimeTable";
import MessageStackScreen from "./screens/GeneralFunctions/Message";

//Statistics
import HistoryOfStudyingStackScreen from "./screens/Statistics/HistoryOfStudying";
import StudyResultStackScreen from "./screens/Statistics/StudyResult";
import ConductStackScreen from "./screens/Statistics/Conduct";

//Studying
import ModulesStackScreen from "./screens/Studying/Modules";
import RegisteredCoursesStackScreen from "./screens/Studying/RegisteredCourses";
import ScheduleOfExamStackScreen from "./screens/Studying/ScheduleOfExam";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AccountTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "Lý lịch cá nhân") {
            iconName = "user";
          } else if (route.name === "Đổi mật khẩu") {
            iconName = "key";
          }
          return <FontAwesome name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Lý lịch cá nhân" component={UserProfileStackScreen} />
      <Tab.Screen name="Đổi mật khẩu" component={ChangePasswordStackScreen} />
    </Tab.Navigator>
  );
};

const GeneralFunctionsTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "Tin Tức - T.Báo") {
            iconName = "newspaper-o";
          } else if (route.name === "Thời khóa biểu") {
            iconName = "calendar";
          } else if (route.name === "Tin nhắn") {
            iconName = "envelope";
          }
          return <FontAwesome name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Tin Tức - T.Báo" component={NewsStackScreen} />
      <Tab.Screen name="Thời khóa biểu" component={TimeTableStackScreen} />
      <Tab.Screen name="Tin nhắn" component={MessageStackScreen} />
    </Tab.Navigator>
  );
};

const StatisticsTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "L.Sử Q.Trình học") {
            iconName = "bookmark";
          } else if (route.name === "Kết quả học tập") {
            iconName = "graduation-cap";
          } else if (route.name === "Kết quả rèn luyện") {
            iconName = "fire";
          }
          return <FontAwesome name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="L.Sử Q.Trình học"
        component={HistoryOfStudyingStackScreen}
      />
      <Tab.Screen name="Kết quả học tập" component={StudyResultStackScreen} />
      <Tab.Screen name="Kết quả rèn luyện" component={ConductStackScreen} />
    </Tab.Navigator>
  );
};

const StudyingTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";

          if (route.name === "Đăng ký học tập") {
            iconName = "pencil-square";
          } else if (route.name === "Lớp H.Phần đã ĐK") {
            iconName = "flag";
          } else if (route.name === "Lịch thi") {
            iconName = "bell";
          }
          return <FontAwesome name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Đăng ký học tập" component={ModulesStackScreen} />
      <Tab.Screen
        name="Lớp H.Phần đã ĐK"
        component={RegisteredCoursesStackScreen}
      />
      <Tab.Screen name="Lịch thi" component={ScheduleOfExamStackScreen} />
    </Tab.Navigator>
  );
};

DrawerContent = (props) => {
  const { signOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/bg-avatar.jpg")}
        style={{ width: undefined, padding: 16 }}
      >
        <Image source={require("./assets/avatar.jpg")} style={styles.profile} />
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Text style={styles.name}>{props.name} </Text>
          <TouchableOpacity
            activeOpacity={0.1}
            onPress={() =>
              Alert.alert(
                "Đăng xuất",
                "Bạn xác nhận muốn đăng xuất?",
                [
                  { text: "OK", onPress: () => signOut() },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <FontAwesome name="sign-out" size={25} color="red"/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <DrawerItemList {...props} />
      <View style={{ alignItems: "center", marginTop: 250 }}>
        <Image source={require("./assets/logo.png")} />
      </View>
    </DrawerContentScrollView>
  );
};

const AppDraw = ({ studentProfile }) => {
  var name = studentProfile.HoVaTen;
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "black";

          if (route.name === "Các chức năng chung") {
            iconName = "home";
          } else if (route.name === "Tài khoản") {
            iconName = "vcard";
          } else if (route.name === "Kế hoạch học tập") {
            iconName = "book";
          } else if (route.name === "Số liệu - Tổng hợp") {
            iconName = "bar-chart";
          }
          return (
            <FontAwesome
              style={{ marginLeft: 10 }}
              name={iconName}
              size={30}
              color={color}
            />
          );
        },
      })}
      drawerContentOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "black",
      }}
      drawerContent={(props) => <DrawerContent {...props} name={name} />}
    >
      <Drawer.Screen
        name="Các chức năng chung"
        component={GeneralFunctionsTabScreen}
      />
      <Drawer.Screen name="Tài khoản" component={AccountTabScreen} />
      <Drawer.Screen name="Kế hoạch học tập" component={StudyingTabScreen} />
      <Drawer.Screen
        name="Số liệu - Tổng hợp"
        component={StatisticsTabScreen}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
  };
};

export default connect(mapStateToProps, null)(AppDraw);
