import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Picker,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Subject from "./../Subject/Subject";
import Course from "./../Course/Course";
import Compose from "./../GeneralFunctions/Compose";
import axios from "axios";
import ListSemester from "../../components/ListSemesterHistory/ListSemesterHistory";

const WIDTH = Dimensions.get("window").width;

const HistoryOfStudying = ({ navigation, studentProfile }) => {
  const [contentTable, setContentTable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [hocKy, setHocKy] = useState("Học kỳ 2 - 2016-2017");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
    ]).then(([subjectRes, courseRes]) => {
      setSubjects(subjectRes.data);
      setCourses(courseRes.data);
      let tableContentTemp = [];
      courseRes.data.forEach((course) => {
        let check = 0;
        for (let tableSemester of tableContentTemp) {
          if (
            tableSemester.year === course.namHoc &&
            tableSemester.semester === course.hocKy
          ) {
            tableSemester.course.push({
              maHP: course.maHP,
              maLHP: course.maLHP,
              lopHP: course.tenLHP,
              diemQTHT: course.diemQTHT,
              diemThi:
                course.diemThi2 === null ? course.diemThi1 : course.diemThi2,
              tongDiem:
                course.tongDiem2 === null ? course.tongDiem1 : course.tongDiem2,
              diemHe4: course.diemHe4,
              diemChu: course.diemChu,
            });
            check = 1;
          }
        }
        if (check === 0) {
          tableContentTemp.push({
            year: course.namHoc,
            semester: course.hocKy,
            course: [
              {
                maHP: course.maHP,
                maLHP: course.maLHP,
                lopHP: course.tenLHP,
                diemQTHT: course.diemQTHT,
                diemThi:
                  course.diemThi2 === null ? course.diemThi1 : course.diemThi2,
                tongDiem:
                  course.tongDiem2 === null
                    ? course.tongDiem1
                    : course.tongDiem2,
                diemHe4: course.diemHe4,
                diemChu: course.diemChu,
              },
            ],
          });
        }
      });
      setContentTable(tableContentTemp);
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
    <>
      <LinearGradient
        colors={["#65A5F6", "#3076F1"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          padding: 15,
          alignItems: "center",
          borderRadius: 16,
          margin: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {studentProfile.HoVaTen}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
          }}
        >
          {studentProfile.MaSinhVien}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: "#dbdbdb",
            backgroundColor: "#fff",
            marginHorizontal: 10,
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          <Picker
            selectedValue={hocKy}
            style={{ height: 40, width: 250 }}
            onValueChange={(value) => setHocKy(value)}
            mode="dropdown"
          >
            <Picker.Item
              label="Học kỳ 2 - 2016-2017"
              value={"Học kỳ 2 - 2016-2017"}
            />
            <Picker.Item
              label="Học kỳ 1 - 2016-2017"
              value={"Học kỳ 1 - 2016-2017"}
            />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              borderRightWidth: 0.5,
              borderColor: "#FFF",
              alignItems: "center",
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>16</Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>Tổng số tín chỉ</Text>
          </View>
          <View
            style={{
              borderLeftWidth: 0.5,
              borderColor: "#FFF",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>9.2 / 3.8</Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>Điểm trung bình</Text>
          </View>
        </View>
      </LinearGradient>

      {contentTable.map((semesterContent, index) => {
        return (
          `Học kỳ ${semesterContent.semester} - ${semesterContent.year}` ===
            hocKy && (
            <FlatList
              key={index}
              data={semesterContent.course}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                  <View style={{ width: WIDTH * 0.7 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {item.lopHP}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#808080" }}>
                      Điểm QTHT: {item.diemQTHT.toFixed(1)}
                      {"   "} Điểm thi: {item.diemThi.toFixed(1)}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#808080" }}>
                      Điểm trung bình (Hệ 10): {item.tongDiem.toFixed(1)}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        backgroundColor: "#D3E3F2",
                        height: 40,
                        width: 80,
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
                        {item.diemChu}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ marginTop: 10 }}
                      onPress={() => {
                        let courseParam = {},
                          subjectParam = {};
                        for (let course of courses) {
                          if (course.maLHP === item.maLHP) {
                            courseParam = { ...course };
                            break;
                          }
                        }
                        for (let subject of subjects) {
                          if (subject.maHP === item.maHP) {
                            subjectParam = { ...subject };
                            break;
                          }
                        }
                        navigation.navigate("Course", {
                          course: courseParam,
                          subject: subjectParam,
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
              )}
              keyExtractor={(item) => `${item.maLHP}`}
            />
          )
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
  };
};

const HistoryOfStudyingConnect = connect(
  mapStateToProps,
  null
)(HistoryOfStudying);

const Stack = createStackNavigator();

export default HistoryOfStudyingStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryOfStudying"
        component={HistoryOfStudyingConnect}
        options={{
          headerTitleAlign: "center",
          title: "Lịch sử quá trình học tập",
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
        name="Subject"
        component={Subject}
        options={({ route }) => ({
          title: route.params.maHP,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: WIDTH - 100,
          },
        })}
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
  titleTable: {
    marginTop: 5,
    backgroundColor: "#d2d2d2",
  },
  titleTableText: {
    textAlign: "center",
  },
  collapseContainer: {},
  header: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
  },
  headerText: {
    fontSize: 20,
  },
  content: {},
});
