import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import Course from './../Course/Course'

const ScheduleOfExam = ({ navigation }) => {
    return (
        <View>
            <Text>User Profile</Text>
            <Button title="Thông tin" onPress={() => navigation.push("Course")}/>
        </View>
    )
}


const Stack = createStackNavigator();

export default ScheduleOfExamStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="ScheduleOfExam"
          component={ScheduleOfExam}
          options={{ headerTitleAlign: "center", title: "Lịch thi", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{ headerTitleAlign: "center", title: "Thông tin Lớp học phần" }}
        />
      </Stack.Navigator>
    )
  }

const styles = StyleSheet.create({
  
})