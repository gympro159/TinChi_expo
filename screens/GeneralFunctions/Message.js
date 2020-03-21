import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const Message = ({ navigation }) => {
    return (
        <View>
            <Text>Message</Text>
            <Button title="Soạn tin" onPress={() => navigation.push("MessageCreate")}/>
        </View>
    )
}

const MessageCreate = () => {
    return (
        <View>
            <Text>MessageCreate</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default MessageStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="Message"
          component={Message}
          options={{ headerTitleAlign: "center", title: "Tin nhắn đến", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="MessageCreate"
          component={MessageCreate}
          options={{ headerTitleAlign: "center", title: "Soạn tin" }}
        />
      </Stack.Navigator>
    )
  }