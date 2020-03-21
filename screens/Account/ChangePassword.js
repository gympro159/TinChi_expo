import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const ChangePassword = () => {
    return (
        <View>
            <Text>ChangePassword</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default ChangePasswordStackScreen = ( {navigation} ) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerTitleAlign: "center", title: "Đổi mật khẩu", headerLeft: (
                () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
              )}}
            />
        </Stack.Navigator>
    )
}
