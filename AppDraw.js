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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

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
          return route.name === "Tin nhắn" ? (
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

const TuitionTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          color = focused ? "blue" : "gray";
          if (route.name === "Nộp học phí trực tuyến") {
            iconName = "usd";
          } else if (route.name === "Lịch sử nộp học phí") {
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
        name="Lịch sử nộp học phí"
        component={HistoryTuitionStackScreen}
      />
      <Tab.Screen
        name="Nộp học phí trực tuyến"
        component={PaymentStackScreen}
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
        <Drawer.Screen name="Kế hoạch học tập" component={StudyingTabScreen} />
        <Drawer.Screen
          name="Số liệu - Tổng hợp"
          component={StatisticsTabScreen}
        />
        <Drawer.Screen name="Học phí- Lệ phí" component={TuitionTabScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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
