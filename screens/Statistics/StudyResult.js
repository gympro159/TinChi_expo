import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import Subject from './../Subject/Subject';

const StudyResult = ({ navigation }) => {
    return (
        <View>
            <Text>StudyResult</Text>
            <Button title="Thông tin học phần" onPress={() => navigation.push("Subject")}/>
        </View>
    )
}

const Stack = createStackNavigator();

export default StudyResultStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="StudyResult"
          component={StudyResult}
          options={{ headerTitleAlign: "center", title: "Kết quả học tập", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="Subject"
          component={Subject}
          options={{ headerTitleAlign: "center", title: "Thông tin học phần" }}
        />
      </Stack.Navigator>
    )
  }