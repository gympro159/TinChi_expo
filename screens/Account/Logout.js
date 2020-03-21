import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const Logout = ({ navigation }) => {
    return (
        <View>
            <Text>Logout</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default LogoutStackScreen = ( {navigation} ) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Logout"
            component={Logout}
            options={{ headerTitleAlign: "center", title: "Đăng xuất", headerLeft: (
                () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
              )}}
            />
        </Stack.Navigator>
    )
}
