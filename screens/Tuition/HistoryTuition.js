import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { Table, Row } from "react-native-table-component";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const HistoryTuition = ({ navigation }) => {
  const [listHistoryTuition, setListHistoryTuition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    axios
      .get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/historyTuition`)
      .then((res) => {
        setListHistoryTuition(res.data.reverse());
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
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
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <FlatList
        data={listHistoryTuition}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 16,
              backgroundColor: "#fff",
              margin: 5,
              height: 100,
              zIndex: 5,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            onPress={() =>
              navigation.navigate("HistoryTuitionDetail", {
                bill: item,
              })
            }
          >
            <View>
              <View
                style={{
                  backgroundColor: "#D3E3F2",
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#3076F1",
                  }}
                >
                  {listHistoryTuition.length - index}
                </Text>
              </View>
            </View>
            <View style={{ width: WIDTH * 0.7 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.hocKy}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Số tiền: <Text style={{ color: "#000" }}>{item.soTien}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.soBienLai}`}
        containerStyle={{ flex: 1 }}
      />
    </View>
  );
};

const HistoryTuitionDetail = ({ route }) => {
  var { bill } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          {bill.hocKy}
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#dbdbdb",
            borderBottomWidth: 0.5,
            marginBottom: 5,
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Số biên lai: </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13, marginLeft: 5 }}>
              {bill.soBienLai}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Ký hiệu: </Text>
            <Text style={{ fontWeight: "bold", fontSize: 13, marginLeft: 5 }}>
              {bill.kyHieu}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Họ và tên: </Text>
          <Text style={styles.input}>{bill.hoTen}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Mã sinh viên: </Text>
          <Text style={styles.input}>{bill.maSV}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Ngày lập: </Text>
          <Text style={styles.input}>{bill.ngayLap}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Nội dung: </Text>
          <Text style={styles.input}>{bill.noiDung}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Số tiền: </Text>
          <Text style={styles.input}>{bill.soTien}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Hình thức thu: </Text>
          <Text style={styles.input}>{bill.hinhThucThu}</Text>
        </View>

        <Table>
          <Row
            data={["STT", "Môn", "Thành tiền"]}
            style={styles.titleTable}
            textStyle={styles.titleTableSchoolText}
            widthArr={[WIDTH * 0.1, WIDTH * 0.6, WIDTH * 0.3]}
          />
          {bill.danhSach.map((row, index) => {
            let rowArr = Object.values(row),
              rm = rowArr.splice(1, 1);
            return (
              <Row
                key={index}
                data={rowArr}
                style={index % 2 ? styles.contentTable2 : styles.contentTable}
                textStyle={styles.contentTableSchoolText}
                widthArr={[WIDTH * 0.1, WIDTH * 0.6, WIDTH * 0.3]}
              />
            );
          })}
        </Table>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default HistoryTuitionStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryTuition"
        component={HistoryTuition}
        options={{
          headerTitleAlign: "center",
          title: "Lịch sử nộp học phí",
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
        name="HistoryTuitionDetail"
        component={HistoryTuitionDetail}
        options={{
          headerTitleAlign: "center",
          title: "Chi tiết hóa đơn",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  label: {
    fontSize: 13,
    marginLeft: 20,
  },
  input: {
    fontWeight: "bold",
    paddingRight: 90,
    fontSize: 13,
    marginLeft: 5,
  },
  titleTable: {
    backgroundColor: "#d6e4fc",
    height: 40,
  },
  contentTable: {
    backgroundColor: "#eaf1fe",
    minHeight: 40,
  },
  contentTable2: {
    backgroundColor: "#fff",
    minHeight: 40,
  },
  titleTableSchoolText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  contentTableSchoolText: {
    textAlign: "center",
    fontSize: 14,
  },
});
