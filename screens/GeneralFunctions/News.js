import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import Axios from "axios";
import ListNews from "./../../components/ListNews/ListNews";

const WIDTH = Dimensions.get("window").width;

const News = ({ navigation }) => {
  [newsContent, setnewsContent] = useState([]);

  useEffect(() => {
    Axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/news`)
      .then((res) => {
        var newsContentTemp = [];
        for(let i=0; i<10; i++)
        {
          newsContentTemp.push(res.data[res.data.length-1-i])
        }
        setnewsContent(newsContentTemp);
      })
  }, [])

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <View style={{borderBottomColor: '#000', borderBottomWidth: 1}}>
        <Text style={styles.titleHeader}>THÔNG BÁO</Text>
      </View>
      <FlatList
        data={newsContent}
        renderItem={({ item, index }) => (
          <ListNews
            news={item}
            index={index}
            onPress={() => {
              navigation.navigate("NewsContent", {
                news_Title: item.title,
                news_Content: item.content,
                news_Date: item.date
              });
            }}
          />
        )}
        keyExtractor={item => `${item.date}`}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const NewsContent = ({ navigation, route }) => {
  return (
    <View style={{padding: 10, paddingTop: 0}}>
      <View style={{borderBottomColor: '#000', borderBottomWidth: 1}}>
        <Text style={styles.titleHeader}>THÔNG BÁO</Text>
      </View>
      <Text style={{fontWeight: 'bold', fontSize: 17}}>   {route.params.news_Title}</Text>
      <Text style={{fontSize: 13, paddingBottom: 10, color: '#777777'}}>({route.params.news_Date})</Text>
      <Text> {route.params.news_Content}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default NewsStackScreen = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerTitleAlign: "center",
          title: "Tin tức - Thông báo",
          headerLeft: () => (
            <FontAwesome
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
              name="bars"
              size={30}
            />
          )
        }}
      />
      <Stack.Screen
        name="NewsContent"
        component={NewsContent}
        options={({ route }) => ({
          title: route.params.news_Title,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: WIDTH - 100
          }
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleHeader: {
    textTransform: "uppercase",
    color: "#004275",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10
  }
});
