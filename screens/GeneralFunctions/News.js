import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import ListNews from "./../../components/ListNews/ListNews";
import { Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

const News = ({ navigation }) => {
  [newsContent, setnewsContent] = useState([
    {
      title:
        "Thông báo về việc thay đổi thời gian thực hiện bổ sung hộ nghèo, cận nghèo năm 2020 và các đối tượng miễn, giảm, trợ cấp xã hội",
      content:
        "Sinh viên tiếp tục triển khai việc bổ sung hộ nghèo, cận nghèo năm 2020 và các đối tượng miễn, giảm, trợ cấp xã hội. \n Ngày 17/02/2020, Hiệu trưởng đã ban hành Thông báo số 121/TB-ĐHKH về việc bổ sung hộ nghèo, cận nghèo năm 2020 của đối tượng dân tộc ít người, tàn tật và cá đối tượng miễn, giảm, trợ cấp xã hội khác đến nay đã hết thời hạn bổ sung. Tuy nhiên, do tình hình sinh viên tiếp tục được nghỉ hoc, để đảm bảo điều kiện thuận lợi, hõ trợ thực hiện đầy đủ chế độ chính sách cho người học, Nhà trường tiếp tục nhận bổ sung các thủ tục cho đến khi có thông báo mới. \n Trân trọng.",
      date: "09/03/2020 10:02"
    },
    {
      title:
        "Thông báo về việc nhắc nhở sinh viên thực hiện kê khai dữ liệu ngoại trú (thông tin dịch tễ)",
      content:
        "Nhà trường thông báo đến sinh viên chưa kê khai dữ liệu ngoại trú (thông tin dịch tễ) khẩn trương thực hiện theo quy định \nNgày 28/02/2020, Nhà trường đã tiến hành thông báo kê khai dữ liệu ngoại trú dùng để báo cáo Ban chỉ đạo phòng, chống dịch bệnh của Trường và Đại học Huế. Đến nay, đa số sinh viên đã thực hiện, tuy nhiên vẫn còn một số chưa chấp hành yêu cầu của Nhà trường. Vì vậy, đề nghị các em sinh viên phải thực hiện nghiêm túc và hoàn thành trước 07h ngày 06/3/2020. \nTrường hợp sinh viên không thực hiện sẽ xem xét xử lý kỷ luật.",
      date: "04/03/2020 15:07"
    }
  ]);

  return (
    <>
      <View>
        <Text>THÔNG BÁO</Text>
      </View>
      <FlatList
        data={newsContent}
        renderItem={({ item }) => (
          <ListNews
            news={item}
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
    </>
  );
};

const NewsContent = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.news_Title}</Text>
      <Text>{route.params.news_Date}</Text>
      <Text>{route.params.news_Content}</Text>
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
            <Icon
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
    paddingTop: 16,
    paddingHorizontal: 16
  }
});
