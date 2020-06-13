import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import _ from "lodash";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import ListRegisteredCourses from "./../../components/ListRegisteredCourses/ListRegisteredCourses";

const WIDTH = Dimensions.get("window").width;

const RegisteredCourses = ({ navigation }) => {
  const tableTitle = ["Số TC", "Lớp học phần", "Ngày bắt đầu", "Giảng viên"];

  const [listRegisteredCourses, setListRegisteredCourses] = useState([
    {
      maLHP: "2019-2020.1.TIN4483.002",
      tenLHP: "Xây dựng ứng dụng với .NET FrameWork - Nhóm 2",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Nguyễn Dũng",
      ngayBatDau: "06/09/2019",
      thoiKhoaBieu: "Thứ 6 [1-3, Lab 4_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4133.001",
      tenLHP: "Quản trị dự án phần mềm - Nhóm 1",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Nguyễn Mậu Hân",
      ngayBatDau: "03/09/2019",
      thoiKhoaBieu: "Thứ 3 [6-8, Lab 2_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4113.001",
      tenLHP: "Quy trình phát triển phần mềm - Nhóm 1",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Hoàng Nguyễn Tuấn Minh",
      ngayBatDau: "12/09/2019",
      thoiKhoaBieu: "Thứ 5 [1-3, Lab 2_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4183.002",
      tenLHP: "Kiểm định phần mềm - Nhóm 2",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Lê Văn Tường Lân",
      ngayBatDau: "04/09/2019",
      thoiKhoaBieu: "Thứ 4 [6-8, Lab 5_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4253.001",
      tenLHP: "Mẫu thiết kế - Nhóm 1",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Nguyễn Văn Trung",
      ngayBatDau: "06/09/2019",
      thoiKhoaBieu: "Thứ 6 [6-8, E401]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4403.003",
      tenLHP: "Lập trình ứng dụng cho các thiết bị di động - Nhóm 3",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Lê Mỹ Cảnh",
      ngayBatDau: "06/09/2019",
      thoiKhoaBieu: "Thứ 4 [1-3, Lab 1_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4013.004",
      tenLHP: "Java nâng cao - Nhóm 4",
      soTC: 3,
      lanHoc: 1,
      giangVien: "Nguyễn Hoàng Hà",
      ngayBatDau: "05/09/2019",
      thoiKhoaBieu: "Thứ 5 [1-3, Lab 4_CNTT]",
      hocPhi: 1050000,
      duocDuyet: false,
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 20 }}>
        <LinearGradient
          colors={["#65A5F6", "#3076F1"]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{
            padding: 10,
            paddingLeft: 20,
            alignItems: "flex-start",
            borderRadius: 16,
            margin: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
              }}
            >
              - Số lớp đã đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {listRegisteredCourses.length}
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {_.filter(listRegisteredCourses, ["duocDuyet", true]).length}
              </Text>
              )
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
              }}
            >
              - Tổng số tín chỉ đã đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {_.sumBy(listRegisteredCourses, "soTC")}
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {_.sumBy(
                  _.filter(listRegisteredCourses, ["duocDuyet", true]),
                  "soTC"
                )}
              </Text>
              )
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
              }}
            >
              - Tổng học phí theo lớp đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                <I18nProvider>
                  <NumberFormat
                    value={_.sumBy(listRegisteredCourses, "hocPhi")}
                  />
                </I18nProvider>
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                <I18nProvider>
                  <NumberFormat
                    value={_.sumBy(
                      _.filter(listRegisteredCourses, ["duocDuyet", true]),
                      "hocPhi"
                    )}
                  />
                </I18nProvider>
              </Text>
              )
            </Text>
          </View>
        </LinearGradient>

        {listRegisteredCourses.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 16,
                backgroundColor: "#fff",
                margin: 5,
                alignItems: "flex-end",
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
              onPress={() => navigation.push("Course")}
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
                    Thời khóa biểu (Tuần đầu): {item.thoiKhoaBieu}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Ngày bắt đầu: {item.ngayBatDau}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Số TC: {item.soTC} / Lần học: {item.lanHoc}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Giảng viên: {item.giangVien}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Học phí:{" "}
                    <I18nProvider>
                      <NumberFormat value={item.hocPhi} />
                    </I18nProvider>
                  </Text>
                </View>
              </View>
              <View>
                {item.duocDuyet ? (
                  <Text style={{ color: "#43BC0A", fontSize: 12 }}>
                    Đã duyệt{" "}
                    <FontAwesome name="check" size={12} color="#43BC0A" />
                  </Text>
                ) : (
                  <Text style={{ color: "#EF2323", fontSize: 12 }}>
                    Chưa duyệt{" "}
                    <FontAwesome name="close" size={12} color="#EF2323" />
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default RegisteredCoursesStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisteredCourses"
        component={RegisteredCourses}
        options={{
          headerTitleAlign: "center",
          title: "Học phần đã đăng ký",
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
  head: {
    backgroundColor: "#D2D2D2",
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 13,
  },
});
