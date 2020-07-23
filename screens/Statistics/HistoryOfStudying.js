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
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import _ from "lodash";
import callApi from "./../../utils/apiCaller";
import { convertTime, getDateFormat } from "./../../constants/common";
import Subject from "./../Subject/Subject";
import Course from "./../Course/Course";
import Compose from "./../GeneralFunctions/Compose";
import axios from "axios";
import ListSemester from "../../components/ListSemesterHistory/ListSemesterHistory";

const WIDTH = Dimensions.get("window").width;

const HistoryOfStudying = ({
  navigation,
  dataToken,
  studentProfile,
  hocKyTacNghiep,
}) => {
  const [contentTable, setContentTable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesSemester, setCoursesSemester] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [hocKy, setHocKy] = useState("");
  const [listHocKy, setListHocKy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tongSoTinChi, setTongSoTinChi] = useState(0);
  const [diemTrungBinh, setDiemTrungBinh] = useState(0.0);

  useEffect(() => {
    var header = {
      "ums-application": dataToken.AppId,
      "ums-time": convertTime(new Date()),
      "ums-token": dataToken.Token,
      "Content-Type": "application/json",
    };
    if (hocKyTacNghiep.MaHocTap) {
      callApi(
        `student-services/lich-su-qua-trinh-hoc?mahoctap=${hocKyTacNghiep.MaHocTap}`,
        "GET",
        null,
        header
      ).then((res) => {
        setCourses(res.data.Data);
        setHocKy(hocKyTacNghiep.MaHocKy);
        let coursesSemesterTemp = [],
          listHocKyTemp = [],
          tongDiem = 0,
          len = 0;
        res.data.Data.forEach((course) => {
          listHocKyTemp.push(course.MaHocKy);
          if (course.MaHocKy === hocKyTacNghiep.MaHocKy) {
            coursesSemesterTemp.push(course);
            if (course.DiemHe10Lan2 >= 0) {
              tongDiem += course.DiemHe10Lan2 * course.SoTinChi;
              len+=course.SoTinChi;
            } else if (course.DiemHe10Lan1 >= 0) {
              tongDiem += course.DiemHe10Lan1;
              len+=course.SoTinChi;
            }
          }
        });
        setTongSoTinChi(_.sumBy(coursesSemesterTemp, "SoTinChi"));
        setDiemTrungBinh(len>0?(tongDiem / len).toFixed(2):tongDiem.toFixed(1));
        setCoursesSemester(coursesSemesterTemp);
        setListHocKy([...new Set(listHocKyTemp)]);
        setLoading(false);
      });
    }
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
            onValueChange={(value) => {
              setHocKy(value);
              let coursesSemesterTemp = [],
                tongDiem = 0,
                len = 0;
              courses.forEach((course) => {
                if (course.MaHocKy === value) {
                  coursesSemesterTemp.push(course);
                  if (course.DiemHe10Lan2 >= 0) {
                    tongDiem += course.DiemHe10Lan2*course.SoTinChi;
                    len+=course.SoTinChi;
                  } else if (course.DiemHe10Lan1 >= 0) {
                    tongDiem += course.DiemHe10Lan1*course.SoTinChi;
                    len+=course.SoTinChi;
                  }
                }
              });
              setTongSoTinChi(_.sumBy(coursesSemesterTemp, "SoTinChi"));
              
              setDiemTrungBinh(len>0?(tongDiem / len).toFixed(2):tongDiem.toFixed(1));
              setCoursesSemester(coursesSemesterTemp);
            }}
            mode="dropdown"
          >
            {listHocKy.map((item, index) => (
              <Picker.Item
                key={index}
                label={`Học kỳ ${item.split(".")[1]} - ${item.split(".")[0]}`}
                value={item}
              />
            ))}
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
            <Text style={{ fontSize: 18, color: "#fff" }}>{tongSoTinChi}</Text>
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
            <Text style={{ fontSize: 18, color: "#fff" }}>{diemTrungBinh}</Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>Điểm trung bình</Text>
          </View>
        </View>
      </LinearGradient>
      {coursesSemester.length === 0 || !coursesSemester[0].MaLopHocPhan ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Không có lớp học phần nào trong học kỳ này!
          </Text>
        </View>
      ) : (
        <FlatList
          data={coursesSemester}
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
                  {item.TenLopHocPhan}
                </Text>
                <Text style={{ fontSize: 14, color: "#808080" }}>
                  Lần học: {item.LanHoc}/ Số tín chỉ: {item.SoTinChi}
                </Text>
                <Text style={{ fontSize: 14, color: "#808080" }}>
                  Điểm QTHT:{" "}
                  {item.DiemQTHT >= 0 ? item.DiemQTHT.toFixed(1) : ""}
                  {"   "} Điểm thi:{" "}
                  {item.DiemThiLan2 >= 0
                    ? item.DiemThiLan2.toFixed(1)
                    : item.DiemThiLan1 >= 0
                    ? item.DiemThiLan1.toFixed(1)
                    : ""}
                </Text>
                <Text style={{ fontSize: 14, color: "#808080" }}>
                  Điểm trung bình (Hệ 10):{" "}
                  {item.DiemHe10Lan2 >= 0
                    ? item.DiemHe10Lan2.toFixed(1)
                    : item.DiemHe10Lan1 >= 0
                    ? item.DiemHe10Lan1.toFixed(1)
                    : ""}
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
                    {item.DiemHe10Lan2 >= 8.5 || item.DiemHe10Lan1 >= 8.5
                      ? "A"
                      : item.DiemHe10Lan2 >= 7 || item.DiemHe10Lan1 >= 7
                      ? "B"
                      : item.DiemHe10Lan2 >= 5.5 || item.DiemHe10Lan1 >= 5.5
                      ? "C"
                      : item.DiemHe10Lan2 >= 4 || item.DiemHe10Lan1 >= 4
                      ? "D"
                      : item.DiemHe10Lan2 >= 0 || item.DiemHe10Lan1 >= 0
                      ? "F"
                      : "-"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={() => {
                    navigation.navigate("Course", {
                      MaLopHocPhan: item.MaLopHocPhan,
                      TenLopHocPhan: item.TenLopHocPhan,
                      MaHocTap: hocKyTacNghiep.MaHocTap,
                      dataToken,
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
          keyExtractor={(item) => `${item.MaLopHocPhan}`}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    studentProfile: state.studentProfile,
    hocKyTacNghiep: state.hocKyTacNghiep,
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
          title: route.params.TenLopHocPhan,
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
