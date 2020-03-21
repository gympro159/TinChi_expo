import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const Conduct = ({ navigation }) => {
    return (
        <View>
            <Text>Conduct</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default ConductStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="Conduct"
          component={Conduct}
          options={{ headerTitleAlign: "center", title: "Kết quả rèn luyện", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
      </Stack.Navigator>
    )
  }