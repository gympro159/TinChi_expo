import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  Picker,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import _ from "lodash";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import Compose from "./../GeneralFunctions/Compose";
import ListRegisterSubject from "./../../components/ListRegisterSubjects/ListRegesterSubjects";
import ListRegisterCourses from "./../../components/ListRegisterCourses/ListRegisterCourses";

const WIDTH = Dimensions.get("window").width;

const Modules = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectsInSemester, setSubjectsInSemester] = useState([]);
  const [subjectsNgoaiKhoa, setSubjectsNgoaiKhoa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayNone, setDisplayNone] = useState(false)

  useEffect(() => {
    axios
      .get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`)
      .then((res) => {
        setSubjects(res.data);
        let subjectsInSemesterTemp = [],
          subjectsNgoaiKhoaTemp = [];
        res.data.forEach((subject) => {
          if (subject.hocKy === 2 && subject.namHoc === "2016-2017") {
            if (!subject.ngoaiKhoa) {
              subjectsInSemesterTemp.push(subject);
            } else subjectsNgoaiKhoaTemp.push(subject);
          }
        });
        setSubjectsInSemester(subjectsInSemesterTemp);
        setSubjectsNgoaiKhoa(subjectsNgoaiKhoaTemp);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Spinner
      visible={loading}
      textContent={"Đang tải..."}
      textStyle={{ color: "#fff" }}
    />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10 }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#3076F1",
              marginHorizontal: 10,
            }}
          >
            Danh sách học phần{"\n"}Học kỳ 2 - Năm học 2016-2017
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: "#D9EDF7",
            padding: 10,
            paddingTop: 5,
            borderRadius: 10,
            alignItems: "flex-end",
            display: displayNone? "none": "flex"
          }}
        >
          <TouchableOpacity onPress={()=>setDisplayNone(true)}>
            <FontAwesome name="close" size={15} color="#3a87ad"/>
          </TouchableOpacity>
          <Text style={{ color: "#3a87ad" }}>
            <Text style={{ fontWeight: "bold" }}>Sinh viên lưu ý:</Text> Ưu tiên
            chọn và đăng ký học các học phần theo kế hoạch đào tạo của
            khóa/ngành, đăng ký học đầy đủ các học phần bắt buộc trong kế hoạch
            đào tạo.
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: "#dbdbdb",
            backgroundColor: "#fff",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            style={{ height: 40, width: undefined }}
            onValueChange={(value) => setSelectedValue(value)}
            mode="dropdown"
          >
            <Picker.Item label="Theo kế hoạch đào tạo" value={0} />
            <Picker.Item label="Theo chương trình đào tạo" value={1} />
            <Picker.Item label="Các học phần ngoại khóa" value={2} />
          </Picker>
        </View>

        {selectedValue === 0 ? (
          subjectsInSemester.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginVertical: 200,
              }}
            >
              Hiện tại chưa tổ chức học phần nào!
            </Text>
          ) : (
            subjectsInSemester.map((subject, index) => {
              return (
                <ListRegisterSubject
                  key={index}
                  stt={index + 1}
                  subject={subject}
                  onPress={() => {
                    navigation.navigate("RegisterCourses", {
                      maLHPDangKy: subject.daDK,
                      maHP: subject.maHP,
                    });
                  }}
                />
              );
            })
          )
        ) : selectedValue === 2 ? (
          subjectsNgoaiKhoa.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginVertical: 200,
              }}
            >
              Hiện tại chưa tổ chức học phần{"\n"} ngoại khóa nào!
            </Text>
          ) : (
            subjectsNgoaiKhoa.map((subject, index) => {
              return (
                <ListRegisterSubject
                  key={index}
                  stt={index + 1}
                  subject={subject}
                  onPress={() => {
                    navigation.navigate("RegisterCourses", {
                      maLHPDangKy: subject.daDK,
                      maHP: subject.maHP,
                    });
                  }}
                />
              );
            })
          )
        ) : (
          subjects.map((subject, index) => {
            return (
              <ListRegisterSubject
                key={index}
                stt={index + 1}
                subject={subject}
                onPress={() => {
                  navigation.navigate("RegisterCourses", {
                    maLHPDangKy: subject.daDK,
                    maHP: subject.maHP,
                  });
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const RegisterCourses = ({ route, navigation }) => {
  const [subject, setSubject] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseRegister, setCourseRegister] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
    ])
      .then(([subjectRes, courseRes]) => {
        for (let sub of subjectRes.data) {
          if (sub.maHP === route.params.maHP) {
            setSubject(sub);
            let listCourse = [];
            courseRes.data.forEach((course) => {
              if (
                course.maHP === sub.maHP &&
                course.maLHP === route.params.maLHPDangKy
              ) {
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return loading ? (
    <Spinner
      visible={loading}
      textContent={"Đang tải..."}
      textStyle={{ color: "#fff" }}
    />
  ) : (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: "#FFF" }}>
      <ScrollView style={{ marginBottom: 10 }}>
        <View style={{ paddingTop: 20 }}>
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
          {Object.keys(courseRegister).length !== 0 && (
            <>
              <View style={styles.content}>
                <Text style={styles.label}>Lớp đã đăng ký: </Text>
                <Text style={styles.input}>{courseRegister.tenLHP}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Thời điểm đăng ký: </Text>
                <Text style={styles.input}>
                  {courseRegister.thoiDiemDangKy}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Trạng thái xử lý: </Text>
                <Text style={styles.input}>{courseRegister.trangThaiXyLy}</Text>
              </View>
            </>
          )}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              margin: 10,
              marginLeft: 20,
              color: "#3076F1",
            }}
          >
            Danh sách lớp:
          </Text>
        </View>

        {courses.map((item, index) => {
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
                    {item.maLHP}{" "}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Số SV (ĐK/TT/TĐ):{" "}
                    <Text style={{ fontWeight: "bold", color: "#000" }}>
                      {item.svDaDangKy}
                    </Text>
                    /{subject.soSVToiThieu}/{subject.soSVToiDa}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Thời khóa biểu (Tuần đầu): {item.thoiKhoaBieu}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Thời gian học: {item.thoiGianHocTheoTKB}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Lần học: {item.lanHoc} / Học phí:{" "}
                    <I18nProvider>
                      <NumberFormat value={item.hocPhi} />
                    </I18nProvider>
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Giảng viên: {item.giangVien}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Ngày hết hạn đăng ký: {item.ngayHetHanDK}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: WIDTH * 0.9,
                  flexDirection: "row",
                  justifyContent:
                    subject.daDK && item.trangThaiXyLy !== "Chưa được duyệt"
                      ? "flex-end"
                      : "space-between",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                {!subject.daDK ? (
                  <TouchableOpacity
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
                  >
                    <Text style={{ color: "#3076F1", fontSize: 15 }}>
                      Ghi danh{" "}
                      <FontAwesome
                        name="pencil-square-o"
                        size={15}
                        color="#3076F1"
                      />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  item.trangThaiXyLy === "Chưa được duyệt" && (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Xác nhận",
                          "Bạn xác nhận muốn hủy lớp học phần này?",
                          [
                            { text: "Đồng ý", style: "cancel" },
                            {
                              text: "Không",
                              style: "cancel",
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text style={{ color: "#EF2323", fontSize: 15 }}>
                        Hủy Lớp{" "}
                        <FontAwesome name="close" size={15} color="#EF2323" />
                      </Text>
                    </TouchableOpacity>
                  )
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Course", {
                      course: item,
                      subject: subject,
                    });
                  }}
                >
                  <Text style={{ color: "#3076F1" }}>
                    Thông tin{" "}
                    <FontAwesome
                      name="chevron-right"
                      size={15}
                      color="#3076F1"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
        name="Course"
        component={Course}
        options={({ route }) => ({
          //headerShown: false,
          title: route.params.course.tenLHP,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: WIDTH - 100,
          },
        })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
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
    backgroundColor: "#d6e4fc",
    height: 40,
  },
  titleTableText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
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
    fontSize: 14,
    marginLeft: 20,
    width: 150,
  },
  input: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
    paddingRight: 190,
  },
});
