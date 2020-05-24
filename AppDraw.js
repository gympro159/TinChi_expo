import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Picker,
  Dimensions,
} from "react-native";
import { Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AuthContext } from "./AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';

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

//Tuition
import HistoryTuitionStackScreen from "./screens/Tuition/HistoryTuition";
import PaymentStackScreen from "./screens/Tuition/Payment";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const { width, height } = Dimensions.get("window");

// const tabs: TabsConfigsType = {
//   Home: {
//       icon: ({ progress }) => /* ICON COMPONENT */
//   },
//   Profile: {
//       icon: ({ progress }) => /* ICON COMPONENT */
//   },
// }

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AccountTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "userProfiles") {
            iconName = "user";
          } else if (route.name === "changePassword") {
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
      <Tab.Screen
        name="userProfiles"
        component={UserProfileStackScreen}
        options={{ title: "Lý lịch cá nhân" }}
      />
      <Tab.Screen
        name="changePassword"
        component={ChangePasswordStackScreen}
        options={{ title: "Đổi mật khẩu" }}
      />
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
          if (route.name === "news") {
            iconName = "newspaper-o";
          } else if (route.name === "timeTable") {
            iconName = "calendar";
          } else if (route.name === "message") {
            iconName = "envelope";
          }
          return route.name === "message" ? (
            <View>
              <FontAwesome
                style={{ marginLeft: 10, minWidth: 35, maxWidth: 35 }}
                name={iconName}
                size={24}
                color={color}
              />
              <Badge
                value="1"
                status="error"
                containerStyle={{ position: "absolute", top: -2, left: 30 }}
              />
            </View>
          ) : (
            <FontAwesome name={iconName} size={24} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="news"
        component={NewsStackScreen}
        options={{ title: "Tin Tức - T.Báo" }}
      />
      <Tab.Screen
        name="timeTable"
        component={TimeTableStackScreen}
        options={{ title: "Thời khóa biểu" }}
      />
      <Tab.Screen
        name="message"
        component={MessageStackScreen}
        options={{ title: "Tin nhắn" }}
      />
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
          if (route.name === "historyOfStudying") {
            iconName = "bookmark";
          } else if (route.name === "studyResult") {
            iconName = "graduation-cap";
          } else if (route.name === "conduct") {
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
        name="historyOfStudying"
        component={HistoryOfStudyingStackScreen}
        options={{ title: "L.Sử Q.Trình học" }}
      />
      <Tab.Screen
        name="studyResult"
        component={StudyResultStackScreen}
        options={{ title: "Kết quả học tập" }}
      />
      <Tab.Screen
        name="conduct"
        component={ConductStackScreen}
        options={{ title: "Kết quả rèn luyện" }}
      />
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

          if (route.name === "modules") {
            iconName = "pencil-square";
          } else if (route.name === "registeredCourses") {
            iconName = "flag";
          } else if (route.name === "scheduleOfExam") {
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
      <Tab.Screen
        name="modules"
        component={ModulesStackScreen}
        options={{ title: "Đăng ký học tập" }}
      />
      <Tab.Screen
        name="registeredCourses"
        component={RegisteredCoursesStackScreen}
        options={{ title: "Lớp H.Phần đã ĐK" }}
      />
      <Tab.Screen
        name="scheduleOfExam"
        component={ScheduleOfExamStackScreen}
        options={{ title: "Lịch thi" }}
      />
    </Tab.Navigator>
  );
};

const TuitionTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "payment") {
            iconName = "usd";
          } else if (route.name === "historyTuition") {
            iconName = "filter";
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
        name="historyTuition"
        component={HistoryTuitionStackScreen}
        options={{ title: "Lịch sử nộp học phí" }}
      />
      <Tab.Screen
        name="payment"
        component={PaymentStackScreen}
        options={{ title: "Nộp học phí trực tuyến" }}
      />
    </Tab.Navigator>
  );
};

DrawerContent = (props) => {
  //console.log(props.avatar);
  const { signOut } = useContext(AuthContext);
  const [hocKy, sethocKy] = useState("Học kỳ 2 - 2019-2020");
  return (
    <DrawerContentScrollView {...props} style={{ height: height }}>
      <View
        style={{
          height: height,
          justifyContent: "space-between",
          marginTop: -5,
        }}
      >
        <View>
          <ImageBackground
            source={require("./assets/bg-avatar.jpg")}
            style={{ width: undefined, padding: 16 }}
          >
            <Image
              source={
                props.avatar
                  ? { uri: `data:image/png;base64,${props.avatar}` }
                  : require("./assets/avatar-default.png")
              }
              style={styles.profile}
            />
            {/* <Image source={require("./assets/avatar.jpg")} style={styles.profile} /> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text style={styles.name}>{props.name} </Text>
              <TouchableOpacity
                activeOpacity={0.1}
                onPress={() =>
                  Alert.alert(
                    "Đăng xuất",
                    "Bạn xác nhận muốn đăng xuất?",
                    [
                      { text: "Đồng ý", onPress: () => signOut() },
                      {
                        text: "Không",
                        style: "cancel",
                      },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <FontAwesome name="sign-out" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: "#dbdbdb",
            backgroundColor: "#f2f2f2",
            marginHorizontal: 10,
            marginBottom: 0,
          }}
        >
          <Picker
            selectedValue={hocKy}
            style={{ height: 40, width: undefined }}
            onValueChange={(value) => sethocKy(value)}
          >
            <Picker.Item
              label="Học kỳ 2 - 2019-2020"
              value={"Học kỳ 2 - 2019-2020"}
            />
            <Picker.Item
              label="Học kỳ 1 - 2019-2020"
              value={"Học kỳ 1 - 2019-2020"}
            />
            <Picker.Item
              label="Học kỳ 2 - 2018-2019"
              value={"Học kỳ 2 - 2018-2019"}
            />
            <Picker.Item
              label="Học kỳ 1 - 2018-2019"
              value={"Học kỳ 1 - 2018-2019"}
            />
            <Picker.Item
              label="Học kỳ 2 - 2017-2018"
              value={"Học kỳ 2 - 2017-2018"}
            />
            <Picker.Item
              label="Học kỳ 1 - 2017-2018"
              value={"Học kỳ 1 - 2017-2018"}
            />
          </Picker>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const AppDraw = ({ studentProfile, avatar }) => {
  var name = studentProfile.HoVaTen,
    avatar;
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
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
              } else if (route.name === "Học phí- Lệ phí") {
                iconName = "money";
              }
              return route.name === "Các chức năng chung" ? (
                <View>
                  <FontAwesome
                    style={{ marginLeft: 10, minWidth: 35, maxWidth: 35 }}
                    name={iconName}
                    size={30}
                    color={color}
                  />
                  <Badge
                    value="1"
                    status="error"
                    containerStyle={{ position: "absolute", top: -4, left: 30 }}
                  />
                </View>
              ) : (
                <FontAwesome
                  style={{ marginLeft: 10, minWidth: 35, maxWidth: 35 }}
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
          drawerContent={(props) => (
            <DrawerContent {...props} name={name} avatar={avatar} />
          )}
        >
          <Drawer.Screen
            name="Các chức năng chung"
            component={GeneralFunctionsTabScreen}
          />
          <Drawer.Screen name="Tài khoản" component={AccountTabScreen} />
          <Drawer.Screen
            name="Kế hoạch học tập"
            component={StudyingTabScreen}
          />
          <Drawer.Screen
            name="Số liệu - Tổng hợp"
            component={StatisticsTabScreen}
          />
          <Drawer.Screen name="Học phí- Lệ phí" component={TuitionTabScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8,
    paddingRight: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps, null)(AppDraw);
