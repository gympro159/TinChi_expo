import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import _ from "lodash";

const WIDTH = Dimensions.get("window").width;

const ScheduleOfExam = ({ navigation, hocKyTacNghiep }) => {
  const tableTitle = ["Lớp học phần", "Lần thi", "Ngày thi", "Phòng thi"];

  const [listSchedules, setListSchedules] = useState([
    {
      maLHP: "2019-2020.1.TIN4483.002",
      tenLHP: "Xây dựng ứng dụng với .NET FrameWork - Nhóm 2",
      lanThi: 1,
      ngayThi: "23/12/2019",
      gioThi: "07g30",
      phongThi: "Lab 3_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4133.001",
      tenLHP: "Quản trị dự án phần mềm - Nhóm 1",
      lanThi: 1,
      ngayThi: "26/12/2019",
      gioThi: "13g30",
      phongThi: "H201",
      hinhThucThi: "Tự luận",
    },
    {
      maLHP: "2019-2020.1.TIN4113.001",
      tenLHP: "Quy trình phát triển phần mềm - Nhóm 1",
      lanThi: 1,
      ngayThi: "28/12/2019",
      gioThi: "13g30",
      phongThi: "Lab 5_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4183.002",
      tenLHP: "Kiểm định phần mềm - Nhóm 2",
      lanThi: 1,
      ngayThi: "02/01/2020",
      gioThi: "07g30",
      phongThi: "E303",
      hinhThucThi: "Tự luận",
    },
    {
      maLHP: "2019-2020.1.TIN4253.001",
      tenLHP: "Mẫu thiết kế - Nhóm 1",
      lanThi: 1,
      ngayThi: "04/01/2020",
      gioThi: "07g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4403.003",
      tenLHP: "Lập trình ứng dụng cho các thiết bị di động - Nhóm 3",
      lanThi: 2,
      ngayThi: "07/01/2020",
      gioThi: "07g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4013.004",
      tenLHP: "Java nâng cao - Nhóm 4",
      lanThi: 1,
      ngayThi: "11/01/2020",
      gioThi: "13g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
  ]);

  return listSchedules.length > 0 ? (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 10 }}>
        <View
          style={{
            marginVertical: 5,
            padding: 15,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 10,
              textAlign: "center",
            }}
          >
            Lịch thi kết thúc học phần {"\n"} Học kỳ{" "}
            {hocKyTacNghiep.HocKy === 3 ? "hè" : hocKyTacNghiep.HocKy} -{" "}
            {hocKyTacNghiep.NamHoc}
          </Text>
        </View>

        {listSchedules.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 16,
                backgroundColor: "#fff",
                margin: 5,
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
            >
              <View
                style={{
                  width: WIDTH * 0.9,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#D3E3F2",
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#3076F1",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <View style={{ width: WIDTH * 0.7 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.tenLHP}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    {item.maLHP}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Giờ thi:{" "}
                    <Text style={{ color: "#000", fontWeight: "bold" }}>
                      {item.gioThi} - {item.ngayThi}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Phòng thi:{" "}
                    <Text style={{ color: "#000", fontWeight: "bold" }}>
                      {item.phongThi}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Hình thức thi: {item.hinhThucThi}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 5,
          padding: 15,
          backgroundColor: "#f2f2f2",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginHorizontal: 10,
            textAlign: "center",
          }}
        >
          Chưa có lịch thi kết thúc học phần
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    hocKyTacNghiep: state.hocKyTacNghiep,
  };
};

const ScheduleOfExamConnect = connect(mapStateToProps, null)(ScheduleOfExam);

const Stack = createStackNavigator();

export default ScheduleOfExamStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScheduleOfExam"
        component={ScheduleOfExamConnect}
        options={{
          headerTitleAlign: "center",
          title: "Lịch thi",
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
        name="Course"
        component={Subject}
        options={{
          headerTitleAlign: "center",
          title: "Thông tin Lớp học phần",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  head: {
    backgroundColor: "#D2D2D2",
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 13,
  },
});
