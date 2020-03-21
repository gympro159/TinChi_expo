import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const UserProfile = ({ navigation }) => {
    return (
        <View>
            <Text>User Profile</Text>
            <Button title="Thay đổi lý lịch" onPress={() => navigation.push("EditProfile")}/>
        </View>
    )
}

const EditProfile = () => {
    return (
        <View>
            <Text>Edit Profile</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default UserProfileStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerTitleAlign: "center", title: "Lý lịch cá nhân", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerTitleAlign: "center", title: "Thay đổi lý lịch" }}
        />
      </Stack.Navigator>
    )
  }

const styles = StyleSheet.create({
  
})