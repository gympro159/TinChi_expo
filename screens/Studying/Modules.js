import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
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
import axios from "axios";
import _ from "lodash";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import ListRegisterSubject from "./../../components/ListRegisterSubjects/ListRegesterSubjects";
import ListRegisterCourses from "./../../components/ListRegisterCourses/ListRegisterCourses"

const WIDTH = Dimensions.get("window").width;

const Modules = ({ navigation }) => {
  const [btnGroupPress, setBtnGroupPress] = useState([true, false, false]);
  const [headTable, setHeadTable] = useState([
    "Mã HP",
    "Tên HP",
    "Số lớp mở ĐK",
    "HP đã ĐK",
  ]);
  const [subjects, setSubjects] = useState([]);
  const [dataRowsBatBuoc, setDataRowsBatBuoc] = useState([]);
  const [dataRowsTuChon, setDataRowsTuChon] = useState([]);
  const [dataRowsNgoaiKhoa, setDataRowsNgoaiKhoa] = useState([]);

  useEffect(() => {
    axios
      .get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`)
      .then((res) => {
        setSubjects(res.data);
        let tableContentTemp = [],
          dataRowsBatBuocTemp = [],
          dataRowsTuChonTemp = [];
        res.data.forEach((subject) => {
          if (subject.namHoc === "2016-2017" && subject.hocKy === 2) {
            tableContentTemp.push(subject);
          }
        });
        tableContentTemp.forEach((subject) => {
          let row = [
            `${subject.maHP}`,
            `${subject.tenHP}`,
            `${subject.soLop}`,
            cellDaDK(subject.daDK, subject.maHP),
          ];
          if (subject.tuChon) dataRowsTuChonTemp.push(row);
          else dataRowsBatBuocTemp.push(row);
        });
        setDataRowsBatBuoc(dataRowsBatBuocTemp);
        setDataRowsTuChon(dataRowsTuChonTemp);
      });
  }, []);

  const cellDaDK = (check, maHP) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>{check ? "✓" : "  "}</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("RegisterCourses", {
            maLHPDangKy: check,
            maHP
          })
        }}>
          <FontAwesome name="list-ul" size={17} color="blue" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          CÁC HỌC PHẦN TRONG HỌC KỲ
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 1 }}>
        <Button
          title="Theo Kế hoạch đào tạo"
          buttonStyle={
            btnGroupPress[0] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[0]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            setBtnGroupPress([true, false, false]);
            let tableContentTemp = [],
              dataRowsBatBuocTemp = [],
              dataRowsTuChonTemp = [];
            subjects.forEach((subject) => {
              if (subject.namHoc === "2016-2017" && subject.hocKy === 2) {
                tableContentTemp.push(subject);
              }
            });
            tableContentTemp.forEach((subject) => {
              let row = [
                `${subject.maHP}`,
                `${subject.tenHP}`,
                `${subject.soLop}`,
                cellDaDK(subject.daDK, subject.maHP),
              ];
              if (subject.tuChon) dataRowsTuChonTemp.push(row);
              else dataRowsBatBuocTemp.push(row);
            });
            setDataRowsBatBuoc(dataRowsBatBuocTemp);
            setDataRowsTuChon(dataRowsTuChonTemp);
          }}
        />
        <Button
          title="Theo CTĐT"
          buttonStyle={
            btnGroupPress[1] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[1]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            let dataRowsBatBuocTemp = [],
              dataRowsTuChonTemp = [];
            setBtnGroupPress([false, true, false]);
            subjects.forEach((subject) => {
              let row = [
                `${subject.maHP}`,
                `${subject.tenHP}`,
                `${subject.soLop}`,
                cellDaDK(subject.daDK, subject.maHP),
              ];
              if (subject.tuChon) dataRowsTuChonTemp.push(row);
              else dataRowsBatBuocTemp.push(row);
            });
            setDataRowsBatBuoc(dataRowsBatBuocTemp);
            setDataRowsTuChon(dataRowsTuChonTemp);
          }}
        />
        <Button
          title="Ngoại khóa"
          buttonStyle={
            btnGroupPress[2] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[2]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            setBtnGroupPress([false, false, true]);
            let tableContentTemp = [],
              dataRowsNgoaiKhoaTemp = [];
            subjects.forEach((subject) => {
              if (
                subject.namHoc === "2016-2017" &&
                subject.hocKy === 2 &&
                subject.ngoaiKhoa === true
              ) {
                tableContentTemp.push(subject);
              }
            });
            tableContentTemp.forEach((subject) => {
              let row = [
                `${subject.maHP}`,
                `${subject.tenHP}`,
                `${subject.soLop}`,
                cellDaDK(subject.daDK, subject.maHP),
              ];
              dataRowsNgoaiKhoaTemp.push(row);
            });
            setDataRowsNgoaiKhoa(dataRowsNgoaiKhoaTemp);
          }}
        />
      </View>
      <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
        <Row
          data={headTable}
          style={styles.titleTable}
          textStyle={styles.titleTableText}
          widthArr={[WIDTH * 0.22, WIDTH * 0.46, WIDTH * 0.16, WIDTH * 0.16]}
        />
      </Table>
      <ListRegisterSubject
        dataRowsBatBuoc={dataRowsBatBuoc}
        dataRowsTuChon={dataRowsTuChon}
        dataRowsNgoaiKhoa={dataRowsNgoaiKhoa}
        ngoaiKhoa={btnGroupPress[2]}
      />
    </View>
  );
};

const RegisterCourses = ({route, navigation}) => {
  const [subject, setSubject] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseRegister, setCourseRegister] = useState({})
  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
    ]).then(([subjectRes, courseRes]) => {
      for (let sub of subjectRes.data) {
        if (sub.maHP === route.params.maHP) {
          setSubject(sub);
          let listCourse = [];
          courseRes.data.forEach((course) => {
            if(course.maHP === sub.maHP && course.maLHP === route.params.maLHPDangKy) {
              setCourseRegister(course);
            }
            if (course.maHP === sub.maHP) {
              listCourse.push(course);
            }
          });
          setCourses(listCourse);
          break;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          ĐĂNG KÝ LỚP HỌC PHẦN
        </Text>
      </View>
        <View style={styles.content}>
          <Text style={styles.label}>Tên học phần: </Text>
          <Text style={styles.input}>{subject.tenHP}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Mã học phần: </Text>
          <Text style={styles.input}>{subject.maHP}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Số tín chỉ: </Text>
          <Text style={styles.input}>{subject.soTinChi}</Text>
        </View>
        {
          (Object.keys(courseRegister).length!==0) && (
            <>
            <View style={styles.content}>
              <Text style={styles.label}>Lớp đã đăng ký: </Text>
              <Text style={styles.input}>{courseRegister.tenLHP}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Thời điểm đăng ký: </Text>
              <Text style={styles.input}>{courseRegister.thoiDiemDangKy}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Trạng thái xử lý: </Text>
              <Text style={styles.input}>{courseRegister.trangThaiXyLy}</Text>
            </View>
            </>
          )
        }
        <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
          <Row
            data={["Giáo viên dạy", "Thời khóa biểu", "Ngày hết hạn ĐK", "Số SV\n(ĐK/TT/TĐ)"]}
            style={styles.titleTable}
            textStyle={styles.titleTableText}
            widthArr={[WIDTH * 0.30, WIDTH * 0.22, WIDTH * 0.23, WIDTH * 0.25]}
          />
        </Table>
        <FlatList
              data={courses}
              renderItem={({ item }) => (
                <ListRegisterCourses
                  course={item}
                  subject={subject}
                  onPressCourse={() => {
                    navigation.navigate("CourseStackScreen", {
                      course: item,
                      screen: "Course",
                      params: {
                        course: item,
                        subject: subject,
                      },
                    });
                  }}
                />
              )}
              keyExtractor={(item) => `${item.maLHP}`}
            />
    </View>
  );
};

const Stack = createStackNavigator();

export default ModulesStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={{
          headerTitleAlign: "center",
          title: "Đăng ký học tập",
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
        name="RegisterCourses"
        component={RegisterCourses}
        options={{ headerTitleAlign: "center", title: "Đăng ký lớp học phần" }}
      />
      <Stack.Screen
        name="Subject"
        component={Subject}
        options={{ headerTitleAlign: "center", title: "Thông tin học phần" }}
      />
      <Stack.Screen
        name="CourseStackScreen"
        component={CourseStackScreen}
        options={({ route }) => ({
          title: route.params.course.tenLHP,
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
    flex: 1,
    paddingTop: 5,
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
  titleTable: {
    backgroundColor: "#d2d2d2",
  },
  titleTableText: {
    textAlign: "center",
  },
  head: {
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
    marginBottom: 5,
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
});
