import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import _ from "lodash";
import { actFetchStudentListLopHocPhanDKHTDaDKRequest } from "./../../actions/index";
import callApi from "./../../utils/apiCaller";
import { convertTime, getDateFormat } from "./../../constants/common";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import ListRegisteredCourses from "./../../components/ListRegisteredCourses/ListRegisteredCourses";

const WIDTH = Dimensions.get("window").width;

const RegisteredCourses = ({
  navigation,
  hocKyTacNghiep,
  dataToken,
  lopHocPhanDKHTDaDK,
  fetchStudentListLopHocPhanDKHTDaDK,
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [first, setFirst] = useState(true);

  const fetchData = () => {
    fetchStudentListLopHocPhanDKHTDaDK(dataToken, hocKyTacNghiep.MaHocKy);
    setFirst(false);
  };

  useEffect(() => {
    setLoading(true);
    if (!first) fetchData();
  }, [hocKyTacNghiep]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (lopHocPhanDKHTDaDK.length) {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lopHocPhanDKHTDaDK]);

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
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                fontSize: 18,
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 5,
              }}
            >
              Học kỳ: {hocKyTacNghiep.HocKy} - {hocKyTacNghiep.NamHoc}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
              }}
            >
              - Số lớp đã đăng ký:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {lopHocPhanDKHTDaDK.length}
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {_.filter(lopHocPhanDKHTDaDK, ["Duyet", true]).length}
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
                {_.sumBy(lopHocPhanDKHTDaDK, "SoTinChi")}
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {_.sumBy(
                  _.filter(lopHocPhanDKHTDaDK, ["Duyet", true]),
                  "SoTinChi"
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
                  <NumberFormat value={_.sumBy(lopHocPhanDKHTDaDK, "HocPhi")} />
                </I18nProvider>
              </Text>{" "}
              (Duyệt:{" "}
              <Text style={{ fontWeight: "bold" }}>
                <I18nProvider>
                  <NumberFormat
                    value={_.sumBy(
                      _.filter(lopHocPhanDKHTDaDK, ["Duyet", true]),
                      "HocPhi"
                    )}
                  />
                </I18nProvider>
              </Text>
              )
            </Text>
          </View>
        </LinearGradient>

        {lopHocPhanDKHTDaDK.map((item, index) => {
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
              onPress={() =>
                navigation.navigate("Course", {
                  MaLopHocPhan: item.MaLopHocPhan,
                  TenLopHocPhan: item.TenLopHocPhan,
                  MaHocTap: hocKyTacNghiep.MaHocTap,
                  dataToken,
                })
              }
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
                    {item.TenLopHocPhan}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    {item.MaLopHocPhan}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Ngày bắt đầu: {getDateFormat(new Date(item.NgayBatDauTKB))}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Số TC: {item.SoTinChi} / Lần học: {item.LanHoc}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Giảng viên: {item.GiangVien[item.GiangVien.length - 1]}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Học phí:{" "}
                    <I18nProvider>
                      <NumberFormat value={item.HocPhi} />
                    </I18nProvider>
                  </Text>
                </View>
              </View>
              <View>
                {item.Duyet ? (
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

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    hocKyTacNghiep: state.hocKyTacNghiep,
    hoSoHocTap: state.hoSoHocTap,
    nganhHocTacNghiep: state.nganhHocTacNghiep,
    lopHocPhanDKHTDaDK: state.lopHocPhanDKHTDaDK,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStudentListLopHocPhanDKHTDaDK: (dataToken, hocKy) => {
      dispatch(actFetchStudentListLopHocPhanDKHTDaDKRequest(dataToken, hocKy));
    },
  };
};

const RegisteredCoursesConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteredCourses);

const Stack = createStackNavigator();

export default RegisteredCoursesStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisteredCourses"
        component={RegisteredCoursesConnect}
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
