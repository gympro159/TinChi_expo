import React from "react";
import { Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import HistoryOfStudyingStackScreen from './screens/Statistics/HistoryOfStudying';
import StudyResultStackScreen from './screens/Statistics/StudyResult';
import ConductStackScreen from './screens/Statistics/Conduct';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

export default AppNavigator = () => {
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
    return(
      <Tab.Navigator>
        <Tab.Screen name="Lý lịch cá nhân" component={UserProfileStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/profile.png')}/>
        )}}/>
        <Tab.Screen name="Đổi mật khẩu" component={ChangePasswordStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/changePass.png')}/>
        )}}/>
        <Tab.Screen name="Đăng xuất" component={LogoutStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/logout.png')}/>
        )}}/>
      </Tab.Navigator>
    )
  }

  const GeneralFunctionsTabScreen = () => {
    return(
      <Tab.Navigator>
        <Tab.Screen name="Tin tức - Thông báo" component={NewsStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/book.png')}/>
        )}}/>
        <Tab.Screen name="Thời khóa biểu" component={TimeTableStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/calendar.png')}/>
        )}}/>
        <Tab.Screen name="Tin nhắn" component={MessageStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/message.png')}/>
        )}}/>
      </Tab.Navigator>
    )
  }

  const StatisticsTabScreen = () => {
    return(
      <Tab.Navigator>
        <Tab.Screen name="L.Sử Q.Trình học" component={HistoryOfStudyingStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/book.png')}/>
        )}}/>
        <Tab.Screen name="Kết quả học tập" component={StudyResultStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/calendar.png')}/>
        )}}/>
        <Tab.Screen name="Kết quả rèn luyện" component={ConductStackScreen} options={{tabBarIcon: (
            () => <Image source={require('./assets/message.png')}/>
        )}}/>
      </Tab.Navigator>
    )
  }

  CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{alignItems: "center", backgroundColor: "#FFF"}}>
          <Image source={require('./assets/logo.png')}/>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Các chức năng chung" component={GeneralFunctionsTabScreen} options={{drawerIcon: (
            () => <Icon style={{marginLeft: 10}} name="newspaper-o" size={30}/>
        )}}/>
        <Drawer.Screen name="Tài khoản" component={AccountTabScreen} options={{drawerIcon: (
            () => <Icon style={{marginLeft: 10}} name="id-card" size={30}/>
        )}}/>
        <Drawer.Screen name="Số liệu - Tổng hợp" component={StatisticsTabScreen} options={{drawerIcon: (
            () => <Icon style={{marginLeft: 10}} name="id-card" size={30}/>
        )}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
