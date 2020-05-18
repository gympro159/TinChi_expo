import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { createStackNavigator } from "@react-navigation/stack";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Compose from "./../GeneralFunctions/Compose";

const WIDTH = Dimensions.get("window").width;

const Course = ({ route, navigation }) => {
  const [btnGroupPress, setBtnGroupPress] = useState([true, false]);
  var { course, subject } = route.params;
  const [titleTable, setTitleTable] = useState([
    "Điểm CC",
    "Điểm KT1",
    "Điểm KT2",
    "Điểm KT3",
    "Điểm KT4",
    "Điểm KT5",
    "Điểm QTHT",
  ]);
  const [titleTableStudent, setTitleTableStudent] = useState([
    "STT",
    "Mã sinh viên",
    "Họ và tên",
  ]);
  const [contentTable, setContentTable] = useState([
    `${course.diemCC === null ? "" : course.diemCC.toFixed(1)}`,
    `${course.diemKT1 === null ? "" : course.diemKT1.toFixed(1)}`,
    `${course.diemKT2 === null ? "" : course.diemKT2.toFixed(1)}`,
    `${course.diemKT3 === null ? "" : course.diemKT3.toFixed(1)}`,
    `${course.diemKT4 === null ? "" : course.diemKT4.toFixed(1)}`,
    `${course.diemKT5 === null ? "" : course.diemKT5.toFixed(1)}`,
    `${course.diemQTHT === null ? "" : course.diemQTHT.toFixed(1)}`,
  ]);
  const [danhSachLop, setDanhSachLop] = useState([]);
  const [tableStudentContent, setTableStudentContent] = useState([]);

  useEffect(() => {
    axios
      .get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/listMember`)
      .then((res) => {
        setDanhSachLop(res.data);
        let tableContentTemp = [];
        res.data.forEach((student, index) => {
          tableContentTemp.push([
            `${index + 1}`,
            `${student.maSV}`,
            `${student.name}`,
          ]);
        });
        setTableStudentContent(tableContentTemp);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#004275",
          marginLeft: 10,
        }}
      >
        THÔNG TIN VỀ LỚP HỌC PHẦN
      </Text>
      {!subject.daDK && (
        <View
          style={{ alignItems: "center", marginHorizontal: 20, marginTop: 10 }}
        >
          <Button
            title="Đăng ký lớp học phần này"
            buttonStyle={{ backgroundColor: "green", borderRadius: 10 }}
            onPress={() =>
              Alert.alert(
                "Xác nhận",
                "Bạn xác nhận muốn đăng ký lớp học phần này?",
                [
                  { text: "Đồng ý", style: "cancel" },
                  {
                    text: "Không",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              )
            }
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Thông tin LHP"
            buttonStyle={
              btnGroupPress[0] ? styles.buttonStylePress : styles.buttonStyle
            }
            titleStyle={
              btnGroupPress[0]
                ? styles.buttonTitleStylePress
                : styles.buttonTitleStyle
            }
            onPress={() => {
              setBtnGroupPress([true, false]);
            }}
          />
          <Button
            title="Danh sách sinh viên"
            buttonStyle={
              btnGroupPress[1] ? styles.buttonStylePress : styles.buttonStyle
            }
            titleStyle={
              btnGroupPress[1]
                ? styles.buttonTitleStylePress
                : styles.buttonTitleStyle
            }
            onPress={() => {
              setBtnGroupPress([false, true]);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Compose", {
                listNguoiNhan: danhSachLop,
              });
            }}
          >
            <FontAwesome name="envelope" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {btnGroupPress[0] ? (
        <ScrollView style={{ borderTopWidth: 0.5, borderTopColor: "#dbdbdb" }}>
          <Text style={styles.title}>Thông tin chung:</Text>
          <View style={styles.content}>
            <Text style={styles.label}>Tên lớp học phần: </Text>
            <Text style={styles.input}>{course.tenLHP}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Mã lớp học phần: </Text>
            <Text style={styles.input}>{course.maLHP}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số tín chỉ: </Text>
            <Text style={styles.input}>{subject.soTinChi}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Giảng viên: </Text>
            <Text style={styles.input}>{course.giangVien}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Đơn vị phụ trách: </Text>
            <Text style={styles.input}>{subject.donViPhuTrach}</Text>
          </View>

          <Text style={styles.title}>
            Thông tin về tổ chức, hoạt động của lớp học phần:
          </Text>
          <View style={styles.content}>
            <Text style={styles.label}>Ngày hết hạn đăng ký: </Text>
            <Text style={styles.input}>{course.ngayHetHanDK}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thời gian học theo TKB: </Text>
            <Text style={styles.input}>{course.thoiGianHocTheoTKB}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thời khóa biểu (tuần đầu): </Text>
            <Text style={styles.input}>{course.thoiKhoaBieu}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Hình thức học: </Text>
            <Text style={styles.input}>{course.hinhThucHoc}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số giờ kế hoạch: </Text>
            <Text style={styles.input}>{course.soGioKeHoach}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số lượng sinh viên: </Text>
            <Text style={styles.input}>
              Tối thiểu: {subject.soSVToiThieu}
              {"\n"}Tối đa: {subject.soSVToiDa}
              {"\n"}Đã đăng ký: {course.svDaDangKy}
              {"\n"}Đã duyệt: {course.svDaDuyet}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Trạng thái hoạt động: </Text>
            <Text style={styles.input}>{course.trangThaiHoatDong}</Text>
          </View>

          <Text style={styles.title}>
            Cách đánh giá điểm quá trình học, điểm thi kết thúc học phần (dự
            kiến):
          </Text>
          <View style={styles.content}>
            <Text style={styles.label}>Điểm QTHT: </Text>
            <Text style={styles.input}>{course.formDiemQTHT}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Điểm kết thúc học phần: </Text>
            <Text style={styles.input}>{course.formDiemHP}</Text>
          </View>

          <Text style={styles.title}>
            Thông tin liên quan đến đăng ký học của sinh viên:
          </Text>
          <View style={styles.content}>
            <Text style={styles.label}>Thời điểm đăng ký: </Text>
            <Text style={styles.input}>{course.thoiDiemDangKy}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Hình thức đăng ký: </Text>
            <Text style={styles.input}>{course.hinhThucDangKy}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Tính tích lũy tín chỉ: </Text>
            <Text style={styles.input}>{course.tinhTichLuyTinChi}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Trạng thái xử lý: </Text>
            <Text style={styles.input}>{course.trangThaiXyLy}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thời điểm xử lý: </Text>
            <Text style={styles.input}>{course.thoiDiemXuLy}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Lần học: </Text>
            <Text style={styles.input}>{course.lanHoc}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Học phí: </Text>
            <Text style={styles.input}>
              <I18nProvider>
                <NumberFormat value={course.hocPhi} />
              </I18nProvider>
            </Text>
          </View>

          <Text style={styles.title}>Kết quả đánh giá quá trình học tập</Text>
          <Table
            borderStyle={{
              borderColor: "#dbdbdb",
              borderWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <Row
              data={titleTable}
              style={styles.titleTable}
              textStyle={styles.titleTableText}
              widthArr={[
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.16,
              ]}
            />
            <Row
              data={contentTable}
              textStyle={styles.titleTableText}
              widthArr={[
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.14,
                WIDTH * 0.16,
              ]}
            />
          </Table>
        </ScrollView>
      ) : (
        <>
          <Table
            borderStyle={{
              borderColor: "#dbdbdb",
              borderWidth: 1,
            }}
          >
            <Row
              data={titleTableStudent}
              style={styles.titleTable}
              textStyle={styles.titleTableSchoolText}
              widthArr={[WIDTH * 0.1, WIDTH * 0.3, WIDTH * 0.6]}
            />
          </Table>
          <ScrollView style={{}}>
            <Table
              borderStyle={{
                borderColor: "#dbdbdb",
                borderWidth: 1,
              }}
            >
              {tableStudentContent.map((row, index) => {
                return (
                  <Row
                    key={index}
                    data={row}
                    style={
                      index % 2 ? styles.contentTable2 : styles.contentTable
                    }
                    textStyle={styles.titleTableSchoolText}
                    widthArr={[WIDTH * 0.1, WIDTH * 0.3, WIDTH * 0.6]}
                  />
                );
              })}
            </Table>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  buttonTitleStyle: {
    color: "#337AB7",
    fontSize: 13,
  },
  buttonStylePress: {
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  buttonTitleStylePress: {
    color: "#000",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  title: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 15,
    color: "blue",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 20,
    width: 150,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    paddingRight: 170,
  },
  titleTable: {
    backgroundColor: "#d2d2d2",
    height: 40,
  },
  contentTable: {
    backgroundColor: "#F9F9F9",
    minHeight: 40,
  },
  contentTable2: {
    backgroundColor: "#fff",
    minHeight: 40,
  },
  titleTableText: {
    textAlign: "center",
  },
  titleTableSchoolText: {
    textAlign: "center",
  },
});

const Stack = createStackNavigator();

export default CourseStackScreen = ({ route, navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        headerLeftContainerStyle: {
          marginTop: -30,
          marginLeft: 20,
        },
        headerTitleStyle: {
          marginTop: -30,
        },
      }}
    >
      <Stack.Screen
        name="Course"
        component={Course}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Compose"
        component={Compose}
        options={{
          headerTitleAlign: "center",
          title: "Soạn tin",
        }}
      />
    </Stack.Navigator>
  );
};
