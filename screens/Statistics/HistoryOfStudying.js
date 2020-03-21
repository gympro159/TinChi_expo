import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import Course from './../Course/Course';

const HistoryOfStudying = ({ navigation }) => {
    return (
        <View>
            <Text>History Of Studying</Text>
            <Button title="Tin tức" onPress={() => navigation.push("Course")}/>
        </View>
    )
}

const Stack = createStackNavigator();

export default HistoryOfStudyingStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="HistoryOfStudying"
          component={HistoryOfStudying}
          options={{ headerTitleAlign: "center", title: "Lịch sử quá trình học tập", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{ headerTitleAlign: "center", title: "Lớp học phần" }}
        />
      </Stack.Navigator>
    )
  }