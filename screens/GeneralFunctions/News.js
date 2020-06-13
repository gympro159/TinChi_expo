import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Axios from "axios";
import {
  getLocalDateFormat,
  getDateISOStringZoneTime,
} from "./../../constants/common";
import { actFetchStudentThoiKhoaBieuRequest } from "./../../actions/index";
import ListNews from "./../../components/ListNews/ListNews";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Home = ({
  navigation,
  dataToken,
  hocKyTacNghiep,
  thoiKhoaBieu,
  fetchThoiKhoaBieu,
}) => {
  const [newsContent, setnewsContent] = useState([]);
  const [scheduleToday, setScheduleToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(0);
  var listView = ["___", "___", "___", "___", "___", "___"];

  useEffect(() => {
    Promise.all([
      Axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/news`),
    ]).then(([resNews]) => {
      var newsContentTemp = [];
      for (let i = 0; i < 10; i++) {
        newsContentTemp.push(resNews.data[resNews.data.length - 1 - i]);
      }
      setnewsContent(newsContentTemp);
      setLoading(false);
    });
    if (hocKyTacNghiep.MaHocKy && !check) {
      setCheck(1);
      fetchThoiKhoaBieu(dataToken, hocKyTacNghiep.MaHocKy);
    }
    let date = getDateISOStringZoneTime(new Date()),
      scheduleTodayTemp = [];
    thoiKhoaBieu.forEach((schedule) => {
      if (schedule.NgayHoc === date) {
        scheduleTodayTemp.push(schedule);
      }
    });
    setScheduleToday(scheduleTodayTemp);
  }, [thoiKhoaBieu]);

  return loading ? (
    <Spinner
      visible={loading}
      textContent={"Đang tải..."}
      textStyle={{ color: "#fff" }}
    />
  ) : (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#3076F1", "#FFF", "#EFF1F7"]}
        start={[0.5, 0]}
        locations={[0.2, 0.5, 0.8]}
        end={[0.5, 1]}
        style={{
          padding: 15,
          alignItems: "center",
        }}
      >
        <View style={{ width: WIDTH * 0.9, height: HEIGHT * 0.4 }}>
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            Lịch học hôm nay
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#FFF",
              borderRadius: 8,
              marginTop: 10,
              width: WIDTH * 0.9,
              height: HEIGHT * 0.34,
            }}
          >
            {listView.map((item, index) => {
              return scheduleToday[index] ? (
                <View
                  key={index}
                  style={{
                    width: WIDTH * 0.3,
                    height: HEIGHT * 0.17,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#808080", textAlign: "center" }}>
                    {scheduleToday[index].TenPhongHoc}
                    {"\n"}
                    Tiết {scheduleToday[index].TietBatDau} -{" "}
                    {scheduleToday[index].TietKetThuc}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {scheduleToday[index].MaLopHocPhan.slice(12, 19)}
                  </Text>
                </View>
              ) : (
                <View
                  key={index}
                  style={{
                    width: WIDTH * 0.3,
                    height: HEIGHT * 0.17,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "#3076F1",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            width: WIDTH,
            height: HEIGHT * 0.5,
            marginTop: 10,
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#000",
                marginHorizontal: 10,
              }}
            >
              Thông báo mới nhất
            </Text>
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => {
                navigation.navigate("News", {
                  newsContent,
                });
              }}
            >
              <Text style={{ color: "#3076F1", fontSize: 16 }}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ width: WIDTH * 0.46 }}
              onPress={() => {
                navigation.navigate("NewsContent", {
                  news_Title: newsContent[0].title,
                  news_Content: newsContent[0].content,
                  news_Date: newsContent[0].date,
                });
              }}
            >
              <Image
                source={require("./../../assets/appIcon.jpg")}
                style={{
                  width: WIDTH * 0.46,
                  height: HEIGHT * 0.22,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#dbdbdb",
                }}
              />
              <Text style={{ color: "#808080", fontSize: 12 }}>
                {newsContent[0].date}
              </Text>
              <Text numberOfLines={2}>{newsContent[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: WIDTH * 0.46 }}
              onPress={() => {
                navigation.navigate("NewsContent", {
                  news_Title: newsContent[1].title,
                  news_Content: newsContent[1].content,
                  news_Date: newsContent[1].date,
                });
              }}
            >
              <Image
                source={require("./../../assets/appIcon.jpg")}
                style={{
                  width: WIDTH * 0.46,
                  height: HEIGHT * 0.22,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#dbdbdb",
                }}
              />
              <Text style={{ color: "#808080", fontSize: 12 }}>
                {newsContent[1].date}
              </Text>
              <Text numberOfLines={2}>{newsContent[1].title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const News = ({ route, navigation }) => {
  var { newsContent } = route.params;

  return (
    <View style={{ backgroundColor: "#FFF" }}>
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
                news_Date: item.date,
              });
            }}
          />
        )}
        keyExtractor={(item) => `${item.date}`}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const NewsContent = ({ navigation, route }) => {
  return (
    <ScrollView
      style={{ padding: 10, paddingTop: 0, backgroundColor: "#FFF", flex: 1 }}
    >
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }}>
        <Text style={styles.titleHeader}>Thông báo</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
        {" "}
        {route.params.news_Title}
      </Text>
      <Text style={{ fontSize: 13, paddingBottom: 10, color: "#777777" }}>
        ({route.params.news_Date})
      </Text>
      <Text> {route.params.news_Content}</Text>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    hocKyTacNghiep: state.hocKyTacNghiep,
    thoiKhoaBieu: state.thoiKhoaBieu,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchThoiKhoaBieu: (dataToken, hocKyTacNghiep) => {
      dispatch(actFetchStudentThoiKhoaBieuRequest(dataToken, hocKyTacNghiep));
    },
  };
};

const HomeConnect = connect(mapStateToProps, mapDispatchToProps)(Home);

const Stack = createStackNavigator();

export default NewsStackScreen = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeConnect}
        options={{
          headerTitleAlign: "center",
          title: "Trang chủ",
          headerLeft: () => (
            <FontAwesome
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
              name="bars"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerTitleAlign: "center",
          title: "Tin tức - Thông báo",
        }}
      />
      <Stack.Screen
        name="NewsContent"
        component={NewsContent}
        options={({ route }) => ({
          title: route.params.news_Title,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: WIDTH - 100,
          },
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
    color: "#3076F1",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 5
  },
});
