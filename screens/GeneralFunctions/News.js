import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import HTMLView from "react-native-htmlview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Axios from "axios";
import {
  convertTime,
  getDateFormat,
  getLocalDateFormat,
  getDateISOStringZoneTime,
} from "./../../constants/common";
import callApi from "./../../utils/apiCaller";
import { actFetchStudentThoiKhoaBieuRequest } from "./../../actions/index";
import ListNews from "./../../components/ListNews/ListNews";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Home = ({ navigation, dataToken, hocKyTacNghiep }) => {
  const [newsContent, setnewsContent] = useState([]);
  const [scheduleToday, setScheduleToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  var listView = ["___", "___", "___", "___", "___", "___"];

  const fetchData = () => {
    if (hocKyTacNghiep.MaHocKy) {
      let date = getDateISOStringZoneTime(new Date())
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-");
      var header = {
        "ums-application": dataToken.AppId,
        "ums-time": convertTime(new Date()),
        "ums-token": dataToken.Token,
        "Content-Type": "application/json",
      };
      Promise.all([
        callApi(`news-services/list-top-news?top=2`),
        callApi(
          `student-services/thoi-khoa-bieu?mahocky=${hocKyTacNghiep.MaHocKy}&tungay=${date}&denngay=${date}`,
          "GET",
          null,
          header
        ),
      ])
        .then(([resNews, resSchedule]) => {
          setnewsContent(resNews.data.Data);
          setRefreshing(false);
          setLoading(false);
          if (resSchedule.data.Code === 1) {
            setScheduleToday(resSchedule.data.Data);
          } else {
            //Nếu hocKyTacNghiep thay đổi quá nhiều, thì fetch tkb sẽ gặp lỗi 401, nếu bị lỗi ta sẽ fetch lại 1 lần nữa
            callApi(
              `student-services/thoi-khoa-bieu?mahocky=${hocKyTacNghiep.MaHocKy}&tungay=${date}&denngay=${date}`,
              "GET",
              null,
              header
            ).then((res) => {
              setScheduleToday(resSchedule.data.Data);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [hocKyTacNghiep]);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ActivityIndicator size="large" color="#3076F1" />
    </View>
  ) : (
    <ScrollView
      style={{ backgroundColor: "#FFF" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={["#3076F1", "#FFF", "#EFF1F7"]}
        start={[0.5, 0]}
        locations={[0.2, 0.5, 0.8]}
        end={[0.5, 1]}
        style={{
          padding: 15,
          paddingBottom: 0,
          alignItems: "center",
          maxHeight: HEIGHT * 0.9,
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
                navigation.push("News");
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
                  newsId: newsContent[0].NewsId,
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
                {getDateFormat(new Date(newsContent[0].CreatedTime))}
              </Text>
              <Text numberOfLines={2}>{newsContent[0].Title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: WIDTH * 0.46 }}
              onPress={() => {
                navigation.navigate("NewsContent", {
                  newsId: newsContent[1].NewsId,
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
                {getDateFormat(new Date(newsContent[1].CreatedTime))}
              </Text>
              <Text numberOfLines={2}>{newsContent[1].Title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const News = ({ navigation }) => {
  const [newsContent, setNewsContent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = () => {
    callApi(`news-services/list-top-news?top=${pageSize}`)
      .then((res) => {
        setNewsContent(res.data.Data);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [pageSize]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleLoadMore = () => {
    if (pageSize < 100) setPageSize(pageSize + 10);
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ActivityIndicator size="large" color="#3076F1" />
    </View>
  ) : (
    <View style={{ backgroundColor: "#FFF" }}>
      <FlatList
        data={newsContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          pageSize < 100 ? (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <ActivityIndicator size="large" color="#3076F1" />
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "#777" }}>
              Không còn thông báo nào!
            </Text>
          )
        }
        renderItem={({ item, index }) => (
          <ListNews
            news={item}
            index={index}
            onPress={() => {
              navigation.navigate("NewsContent", {
                newsId: item.NewsId,
                title: item.Title,
              });
            }}
          />
        )}
        keyExtractor={(item) => `${item.ID}`}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const NewsContent = ({ route }) => {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi(`news-services/get-news?id=${route.params.newsId}`).then((res) => {
      setNews(res.data.Data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ActivityIndicator size="large" color="#3076F1" />
    </View>
  ) : (
    <ScrollView
      style={{ padding: 10, paddingTop: 0, backgroundColor: "#FFF", flex: 1 }}
    >
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }}>
        <Text style={styles.titleHeader}>Thông báo</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}> {news.Title}</Text>
      <Text style={{ fontSize: 13, paddingBottom: 10, color: "#777777" }}>
        ({getDateFormat(new Date(news.CreatedTime))})
      </Text>
      <View
        style={{
          width: WIDTH,
          borderBottomWidth: 0.5,
          borderBottomColor: "#dbdbdb",
        }}
      ></View>
      <View style={{ paddingVertical: 20 }}>
        <HTMLView value={news.FullContent} />
      </View>
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
          title: route.params.title,
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
    paddingBottom: 5,
  },
});
