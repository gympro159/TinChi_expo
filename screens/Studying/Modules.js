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
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import _ from "lodash";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import {
  actFetchStudentListHocPhanHocKyRequest,
  actFetchStudentListLopHocPhanDKHTDaDKRequest,
} from "./../../actions/index";
import callApi from "./../../utils/apiCaller";
import { convertTime, getDateFormat } from "./../../constants/common";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import Compose from "./../GeneralFunctions/Compose";
import ListRegisterSubject from "./../../components/ListRegisterSubjects/ListRegesterSubjects";

const WIDTH = Dimensions.get("window").width;

const Modules = ({
  navigation,
  dataToken,
  hocKyTacNghiep,
  hoSoHocTap,
  hocPhanDKHT,
  lopHocPhanDKHTDaDK,
  fetchStudentListHocPhanHocKy,
  fetchStudentListLopHocPhanDKHTDaDK,
}) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectsInSemester, setSubjectsInSemester] = useState([]);
  const [subjectsRender, setSubjectsRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [displayNone, setDisplayNone] = useState(false);
  const [nganhHocTacNghiep, setNganhHocTacNghiep] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [demFetch, setDemFetch] = useState(0);
  const fetchData = () => {
    let nganhHocTacNghiepTemp = {};
    if (
      Object.keys(hoSoHocTap).length > 0 &&
      Object.keys(hocKyTacNghiep).length > 0
    ) {
      for (let hoSo of hoSoHocTap.HoSoNhapHoc) {
        if (hoSo.MaHocTap === hocKyTacNghiep.MaHocTap) {
          for (let quaTrinh of hoSo.QuaTrinhHocTap) {
            if (quaTrinh.MaHocKy === hocKyTacNghiep.MaHocKy) {
              nganhHocTacNghiepTemp = { ...quaTrinh };
              break;
            }
          }
          break;
        }
      }
    }
    if (
      Object.keys(nganhHocTacNghiepTemp).length > 0 &&
      Object.keys(dataToken).length > 0
    ) {
      setNganhHocTacNghiep(nganhHocTacNghiepTemp);
      fetchStudentListHocPhanHocKy(dataToken, nganhHocTacNghiepTemp);
      fetchStudentListLopHocPhanDKHTDaDK(
        dataToken,
        nganhHocTacNghiepTemp.MaHocKy
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [hocKyTacNghiep]);

  useEffect(() => {
    if (demFetch === 2) setDemFetch(0);
    //Mỗi lần hocKyTacNghiep thay đổi thì hàm này chạy 3 lần(demFetch=2) => setState vào lần chạy thứ 3
    else setDemFetch(demFetch + 1);
    if (refreshing && demFetch === 1) setDemFetch(0); //Mỗi lần refreshing thì hàm này chạy 2 lần (demFetch=1)
    // if (Object.keys(hocPhanDKHT).length > 0 && lopHocPhanDKHTDaDK.length > 0) {
    if (demFetch >= 2 || (demFetch === 1 && refreshing)) {
      setSubjects(hocPhanDKHT.DanhSachHocPhanNgoaiKeHoach);
      setSubjectsInSemester(hocPhanDKHT.DanhSachHocPhanTrongKeHoach);
      setSubjectsRender(
        selectedValue === 0
          ? hocPhanDKHT.DanhSachHocPhanTrongKeHoach.slice(0, 10)
          : hocPhanDKHT.DanhSachHocPhanNgoaiKeHoach.slice(0, 10)
      );
      //setDemFetch(0);
      setPageSize(10);
      setLoading(false);
      setRefreshing(false);
    }
  }, [hocPhanDKHT, lopHocPhanDKHTDaDK]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleLoadMore = () => {
    setSubjectsRender(
      selectedValue === 0
        ? [
            ...subjectsRender,
            ...subjectsInSemester.slice(pageSize, pageSize + 10),
          ]
        : [...subjectsRender, ...subjects.slice(pageSize, pageSize + 10)]
    );
    setPageSize(pageSize + 10);
  };

  const handleCheckDKHP = (subject, lopHocPhanDKHTDaDK) => {
    let check = false;
    for (let item of lopHocPhanDKHTDaDK) {
      if (item.MaHocPhan === subject.MaHocPhan) {
        check = true;
        break;
      }
    }
    return check;
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
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#3076F1",
            marginHorizontal: 10,
          }}
        >
          Danh sách học phần{"\n"}Học kỳ{" "}
          {nganhHocTacNghiep.MaHocKy.split(".")[1] === "3"
            ? "hè"
            : nganhHocTacNghiep.MaHocKy.split(".")[1]}{" "}
          - {nganhHocTacNghiep.MaHocKy.split(".")[0]}
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
          display: displayNone ? "none" : "flex",
        }}
      >
        <TouchableOpacity onPress={() => setDisplayNone(true)}>
          <FontAwesome name="close" size={15} color="#3a87ad" />
        </TouchableOpacity>
        <Text style={{ color: "#3a87ad" }}>
          <Text style={{ fontWeight: "bold" }}>Sinh viên lưu ý:</Text> Ưu tiên
          chọn và đăng ký học các học phần theo kế hoạch đào tạo của khóa/ngành,
          đăng ký học đầy đủ các học phần bắt buộc trong kế hoạch đào tạo.
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
          onValueChange={(value) => {
            setSelectedValue(value);
            if (value === 0) {
              setSubjectsRender(subjectsInSemester.slice(0, 10));
              setPageSize(10);
            } else {
              setSubjectsRender(subjects.slice(0, 10));
              setPageSize(10);
            }
          }}
          mode="dropdown"
        >
          <Picker.Item label="Theo kế hoạch đào tạo" value={0} />
          <Picker.Item label="Theo chương trình đào tạo" value={1} />
        </Picker>
      </View>

      {subjectsRender.length === 0 ? (
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
        <FlatList
          data={subjectsRender}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={
            ((selectedValue === 0 && pageSize < subjectsInSemester.length) ||
              (selectedValue === 1 && pageSize < subjects.length)) &&
            handleLoadMore
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            ((selectedValue === 0 && pageSize < subjectsInSemester.length) ||
              (selectedValue === 1 && pageSize < subjects.length)) && (
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <ActivityIndicator size="large" color="#3076F1" />
              </View>
            )
          }
          renderItem={({ item, index }) => (
            <ListRegisterSubject
              key={index}
              stt={index + 1}
              check={handleCheckDKHP(item, lopHocPhanDKHTDaDK)}
              subject={item}
              onPress={() => {
                navigation.navigate("RegisterCourses", {
                  nganhHocTacNghiep,
                  subject: item,
                  trongKeHoach:
                    _.differenceWith(subjectsInSemester, [item], _.isEqual)
                      .length !== subjectsInSemester.length
                      ? true
                      : false,
                });
              }}
            />
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      )}
    </View>
  );
};

const RegisterCourses = ({
  route,
  navigation,
  dataToken,
  hocKyTacNghiep,
  lopHocPhanDKHTDaDK,
  fetchStudentListLopHocPhanDKHTDaDK,
}) => {
  const [courses, setCourses] = useState([]);
  const [courseRegistered, setCourseRegistered] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  var { subject, nganhHocTacNghiep, trongKeHoach } = route.params;
  const fetchData = () => {
    if (Object.keys(nganhHocTacNghiep).length > 0) {
      var header = {
        "ums-application": dataToken.AppId,
        "ums-time": convertTime(new Date()),
        "ums-token": dataToken.Token,
        "Content-Type": "application/json",
      };
      callApi(
        `student-services/danh-sach-lop-hoc-phan?mahocky=${nganhHocTacNghiep.MaHocKy}&mahocphan=${subject.MaHocPhan}&makhoahoc=${nganhHocTacNghiep.MaKhoaHoc}&manganh=${nganhHocTacNghiep.MaNganh}&trongkehoach=${trongKeHoach}`,
        "GET",
        null,
        header
      )
        .then((res) => {
          var coursesTemp = [...res.data.Data];
          if (trongKeHoach) {
            callApi(
              `student-services/danh-sach-lop-hoc-phan?mahocky=${
                nganhHocTacNghiep.MaHocKy
              }&mahocphan=${subject.MaHocPhan}&makhoahoc=${
                nganhHocTacNghiep.MaKhoaHoc
              }&manganh=${nganhHocTacNghiep.MaNganh}&trongkehoach=${false}`,
              "GET",
              null,
              header
            ).then((res2) => {
              setCourses([...coursesTemp, ...res2.data.Data]);
              setCourseRegistered({});
              for (let item of lopHocPhanDKHTDaDK) {
                if (item.MaHocPhan === subject.MaHocPhan) {
                  setCourseRegistered(item);
                  break;
                }
              }
              setLoading(false);
              setRefreshing(false);
            });
          } else {
            setCourses(coursesTemp);
            setCourseRegistered({});
            for (let item of lopHocPhanDKHTDaDK) {
              if (item.MaHocPhan === subject.MaHocPhan) {
                setCourseRegistered(item);
                break;
              }
            }
            setLoading(false);
            setRefreshing(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setRefreshing(false);
        });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [lopHocPhanDKHTDaDK]);

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
    <View style={{ flex: 1, marginTop: 0, backgroundColor: "#FFF" }}>
      <ScrollView
        style={{ marginBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingTop: 20 }}>
          <View style={styles.content}>
            <Text style={styles.label}>Tên học phần: </Text>
            <Text style={styles.input}>{subject.TenHocPhan}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Mã học phần: </Text>
            <Text style={styles.input}>{subject.MaHocPhan}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số tín chỉ: </Text>
            <Text style={styles.input}>{subject.SoTinChi}</Text>
          </View>
          {Object.keys(courseRegistered).length > 0 && (
            <>
              <View style={styles.content}>
                <Text style={styles.label}>Lớp đã đăng ký: </Text>
                <Text style={styles.input}>
                  {courseRegistered.TenLopHocPhan}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Thời điểm đăng ký: </Text>
                <Text style={styles.input}>
                  {getDateFormat(new Date(courseRegistered.NgayDangKy))}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Trạng thái xử lý: </Text>
                <Text style={styles.input}>
                  {courseRegistered.Duyet ? "Đã duyệt" : "Chưa duyệt"}
                </Text>
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
                    {item.TenLopHocPhan}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    {item.MaLopHocPhan}{" "}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Số SV (ĐK/TT/TĐ):{" "}
                    <Text style={{ fontWeight: "bold", color: "#000" }}>
                      {item.SoSinhVienDangKy}
                    </Text>
                    /{item.SoSinhVienToiThieu}/{item.SoSinhVienToiDa}
                  </Text>
                  {/* <Text style={{ fontSize: 14, color: "#808080" }}>
                    Lần học: {item.lanHoc} / Học phí:{" "}
                    <I18nProvider>
                      <NumberFormat value={item.hocPhi} />
                    </I18nProvider>
                  </Text> */}
                  <Text style={{ fontSize: 14, color: "#808080" }}>
                    Ngày hết hạn đăng ký:{" "}
                    {getDateFormat(new Date(item.NgayHetHanDangKy))}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: WIDTH * 0.9,
                  flexDirection: "row",
                  justifyContent:
                    (Object.keys(courseRegistered).length > 0 &&
                      (courseRegistered.Duyet ||
                        (!courseRegistered.Duyet &&
                          courseRegistered.MaLopHocPhan !==
                            item.MaLopHocPhan))) ||
                    (Object.keys(courseRegistered).length === 0 &&
                      (item.SoSinhVienDangKy >= item.SoSinhVienToiDa ||
                        !item.ChoPhepDangKy ||
                        item.TrangThai !== 1 ||
                        new Date(item.NgayHetHanDangKy).getTime() -
                          new Date().getTime() <=
                          0))
                      ? "flex-end"
                      : "space-between",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                {Object.keys(courseRegistered).length === 0 &&
                item.TrangThai === 1 &&
                item.ChoPhepDangKy &&
                item.SoSinhVienDangKy < item.SoSinhVienToiDa &&
                new Date(item.NgayHetHanDangKy).getTime() -
                  new Date().getTime() >
                  0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Xác nhận",
                        "Bạn xác nhận muốn đăng ký lớp học phần này?",
                        [
                          {
                            text: "Đồng ý",
                            onPress: () => {
                              var header = {
                                "ums-application": dataToken.AppId,
                                "ums-time": convertTime(new Date()),
                                "ums-token": dataToken.Token,
                                "Content-Type": "application/json",
                              };
                              callApi(
                                `student-services/dang-ky-lop-hoc-phan?malophocphan=${item.MaLopHocPhan}&mahoctap=${hocKyTacNghiep.MaHocTap}&mahocky=${hocKyTacNghiep.MaHocKy}`,
                                "POST",
                                null,
                                header
                              )
                                .then((res) => {
                                  if (res.data.Code === 1) {
                                    setLoading(true);
                                    fetchStudentListLopHocPhanDKHTDaDK(
                                      dataToken,
                                      nganhHocTacNghiep.MaHocKy
                                    );
                                    Alert.alert(
                                      "Thông báo",
                                      `${res.data.Data}!`,
                                      [
                                        {
                                          text: "OK",
                                          style: "cancel",
                                        },
                                      ],
                                      { cancelable: false }
                                    );
                                  } else {
                                    Alert.alert(
                                      "Thông báo",
                                      `${res.data.Msg}!`,
                                      [
                                        {
                                          text: "OK",
                                          style: "cancel",
                                        },
                                      ],
                                      { cancelable: false }
                                    );
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            },
                          },
                          {
                            text: "Không",
                            style: "cancel",
                          },
                        ],
                        { cancelable: false }
                      )
                    }
                  >
                    <Text style={{ color: "#3076F1", fontSize: 16 }}>
                      Ghi danh{" "}
                      <FontAwesome
                        name="pencil-square-o"
                        size={15}
                        color="#3076F1"
                      />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  Object.keys(courseRegistered).length > 0 &&
                  !courseRegistered.Duyet &&
                  courseRegistered.MaLopHocPhan === item.MaLopHocPhan && (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Xác nhận",
                          "Bạn xác nhận muốn hủy lớp học phần này?",
                          [
                            {
                              text: "Đồng ý",
                              onPress: () => {
                                var header = {
                                  "ums-application": dataToken.AppId,
                                  "ums-time": convertTime(new Date()),
                                  "ums-token": dataToken.Token,
                                  "Content-Type": "application/json",
                                };
                                callApi(
                                  `student-services/huy-dang-ky-lop-hoc-phan?malophocphan=${item.MaLopHocPhan}&mahoctap=${hocKyTacNghiep.MaHocTap}&mahocky=${hocKyTacNghiep.MaHocKy}`,
                                  "POST",
                                  null,
                                  header
                                )
                                  .then((res) => {
                                    if (res.data.Code === 1) {
                                      setLoading(true);
                                      fetchStudentListLopHocPhanDKHTDaDK(
                                        dataToken,
                                        nganhHocTacNghiep.MaHocKy
                                      );
                                      Alert.alert(
                                        "Thông báo",
                                        `${res.data.Data}!`,
                                        [
                                          {
                                            text: "OK",
                                            style: "cancel",
                                          },
                                        ],
                                        { cancelable: false }
                                      );
                                    } else {
                                      Alert.alert(
                                        "Thông báo",
                                        `${res.data.Msg}!`,
                                        [
                                          {
                                            text: "OK",
                                            style: "cancel",
                                          },
                                        ],
                                        { cancelable: false }
                                      );
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              },
                            },
                            {
                              text: "Không",
                              style: "cancel",
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text style={{ color: "#EF2323", fontSize: 16 }}>
                        Hủy Lớp{" "}
                        <FontAwesome name="close" size={15} color="#EF2323" />
                      </Text>
                    </TouchableOpacity>
                  )
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Course", {
                      MaLopHocPhan: item.MaLopHocPhan,
                      TenLopHocPhan: item.TenLopHocPhan,
                      MaHocTap: hocKyTacNghiep.MaHocTap,
                      dataToken,
                    });
                  }}
                >
                  <Text style={{ color: "#3076F1", fontSize: 16 }}>
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

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    hocKyTacNghiep: state.hocKyTacNghiep,
    hoSoHocTap: state.hoSoHocTap,
    nganhHocTacNghiep: state.nganhHocTacNghiep,
    hocPhanDKHT: state.hocPhanDKHT,
    lopHocPhanDKHTDaDK: state.lopHocPhanDKHTDaDK,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStudentListHocPhanHocKy: (dataToken, nganhHocTacNghiep) => {
      dispatch(
        actFetchStudentListHocPhanHocKyRequest(dataToken, nganhHocTacNghiep)
      );
    },
    fetchStudentListLopHocPhanDKHTDaDK: (dataToken, hocKy) => {
      dispatch(actFetchStudentListLopHocPhanDKHTDaDKRequest(dataToken, hocKy));
    },
  };
};

const ModulesConnect = connect(mapStateToProps, mapDispatchToProps)(Modules);
const RegisterCoursesConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCourses);

const Stack = createStackNavigator();

export default ModulesStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Modules"
        component={ModulesConnect}
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
        component={RegisterCoursesConnect}
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
