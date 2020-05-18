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
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
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
      giangVien: "Nguyễn Dũng",
      ngayBatDau: "06/09/2019",
      thoiKhoaBieu: "Thứ 6 [1-3, Lab 4_CNTT]",
      hocPhi: 1050000,
      duocDuyet: true,
    },
    {
      maLHP: "2019-2020.1.TIN4133.001",
      tenLHP: "	Quản trị dự án phần mềm - Nhóm 1",
      soTC: 3,
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
      giangVien: "Nguyễn Hoàng Hà",
      ngayBatDau: "05/09/2019",
      thoiKhoaBieu: "Thứ 5 [1-3, Lab 4_CNTT]",
      hocPhi: 1050000,
      duocDuyet: false,
    },
  ]);

  const handleContentList = () => {
    let contentListTemp = { duocDuyet: [], dangChoDuyet: [] };
    listRegisteredCourses.forEach((course) => {
      if (course.duocDuyet) {
        contentListTemp.duocDuyet.push(course);
      } else {
        contentListTemp.dangChoDuyet.push(course);
      }
    });
    return contentListTemp;
  };

  const [listRender, setListRender] = useState(() => handleContentList());

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10  }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          LỚP HỌC PHẦN ĐÃ ĐĂNG KÝ
        </Text>
      </View>
      <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
        <View style={{ marginBottom: 5, borderBottomWidth: 0.5, borderBottomColor: "#dbdbdb" }}>
          <Text>
            - Số lớp đã đăng ký:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {listRegisteredCourses.length}
            </Text>
          </Text>
          <Text>
            - Số lớp đã được duyệt:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {_.filter(listRegisteredCourses, ["duocDuyet", true]).length}
            </Text>
          </Text>
        </View>
        <View style={{ marginBottom: 5, borderBottomWidth: 0.5, borderBottomColor: "#dbdbdb" }}>
          <Text>
            - Tổng số tín chỉ đã đăng ký:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {_.sumBy(listRegisteredCourses, "soTC")}
            </Text>
          </Text>
          <Text>
            - Tổng số tín chỉ đã được duyệt:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {_.sumBy(
                _.filter(listRegisteredCourses, ["duocDuyet", true]),
                "soTC"
              )}
            </Text>
          </Text>
        </View>
        <View>
          <Text>
            - Tổng học phí theo lớp đăng ký:{" "}
            <Text style={{ fontWeight: "bold" }}>
              <I18nProvider>
                <NumberFormat
                  value={_.sumBy(listRegisteredCourses, "hocPhi")}
                />
              </I18nProvider>
            </Text>
          </Text>
          <Text>
            - Tổng học phí theo lớp đã duyệt:{" "}
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
          </Text>
        </View>
      </View>
      <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
        <Row
          data={tableTitle}
          style={styles.head}
          textStyle={styles.text}
          widthArr={[WIDTH * 0.12, WIDTH * 0.3, WIDTH * 0.33, WIDTH * 0.25]}
        />
      </Table>
      <ScrollView style={{ marginBottom: 10 }}>
        <ListRegisteredCourses
          listRender={listRender}
          onPressCourse={(item) => {
            navigation.push("Course");
          }}
        />
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
          title: "Lớp H.Phần đã đăng ký",
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
    paddingTop: 5,
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
