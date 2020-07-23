import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Picker,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import _ from "lodash";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import LineChartWithTooltips from "./../../components/LineChartWithTooltip/LineChartWithTooltip";
import callApi from "./../../utils/apiCaller";
import { convertTime, getDateFormat } from "./../../constants/common";
import Subject from "./../Subject/Subject";
import ListSemester from "../../components/ListSemesterResult/ListSemesterResult";
import Course from "../Course/Course";
import Compose from "./../GeneralFunctions/Compose";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const StudyResult = ({
  navigation,
  studentProfile,
  dataToken,
  hocKyTacNghiep,
}) => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [diemTrungBinh, setDiemTrungBinh] = useState(0.0);
  const [tongSoTinChi, setTongSoTinChi] = useState(0);
  const [dataProgressChart, setDataProgressChart] = useState({});
  const [dataProgressChart2, setDataProgressChart2] = useState({});
  const [dataLineChart, setDataLineChart] = useState({});
  useEffect(() => {
    var header = {
      "ums-application": dataToken.AppId,
      "ums-time": convertTime(new Date()),
      "ums-token": dataToken.Token,
      "Content-Type": "application/json",
    };
    if (hocKyTacNghiep.MaHocTap) {
      callApi(
        `student-services/ket-qua-hoc-tap?mahoctap=${hocKyTacNghiep.MaHocTap}`,
        "GET",
        null,
        header
      ).then((res) => {
        setSubjects(res.data.Data);
        let listDiemTBTheoHK = [],
          ky = 1,
          diemTongTemp = 0;
        res.data.Data.forEach((subject) => {
          if (subject.CoTichLuy) {
            diemTongTemp += subject.DiemHe4 >= 0 ? subject.DiemHe4 * subject.SoTinChi: 0;
            if (listDiemTBTheoHK.length === 0) {
              listDiemTBTheoHK.push({
                Ky: `Kỳ ${ky}`,
                MaHocKy: subject.HocKyTinhTichLuy,
                DiemTong:
                  subject.DiemHe4 >= 0 ? subject.DiemHe4 * subject.SoTinChi : 0,
                soTC: subject.DiemHe4 >= 0 ? subject.SoTinChi : 0,
              });
            } else {
              if (
                listDiemTBTheoHK[listDiemTBTheoHK.length - 1].MaHocKy ===
                subject.HocKyTinhTichLuy
              ) {
                listDiemTBTheoHK[listDiemTBTheoHK.length - 1].DiemTong +=
                  subject.DiemHe4 >= 0 ? subject.DiemHe4 * subject.SoTinChi : 0;
                listDiemTBTheoHK[listDiemTBTheoHK.length - 1].soTC +=
                  subject.DiemHe4 >= 0 ? subject.SoTinChi : 0;
              } else {
                ky++;
                listDiemTBTheoHK.push({
                  Ky: `Kỳ ${ky}`,
                  MaHocKy: subject.HocKyTinhTichLuy,
                  DiemTong:
                    subject.DiemHe4 >= 0
                      ? subject.DiemHe4 * subject.SoTinChi
                      : 0,
                  soTC: subject.DiemHe4 >= 0 ? subject.SoTinChi : 0,
                });
              }
            }
          }
        });
        setTongSoTinChi(
          _.sumBy(
            _.filter(res.data.Data, function (o) {
              return o.CoTichLuy && o.DiemHe4 >= 0;
            }),
            "SoTinChi"
          )
        );

        setDiemTrungBinh(
          (
            diemTongTemp /
            _.sumBy(
              _.filter(res.data.Data, function (o) {
                return o.CoTichLuy && o.DiemHe4 >= 0;
              }),
              "SoTinChi"
            )
          ).toFixed(2)
        );

        setDataProgressChart({
          data: [
            _.sumBy(
              _.filter(res.data.Data, function (o) {
                return o.CoTichLuy && o.DiemHe4 >= 0;
              }),
              "DiemHe4"
            ) /
              _.filter(res.data.Data, function (o) {
                return o.CoTichLuy && o.DiemHe4 >= 0;
              }).length /
              4,
          ],
        });
        setDataProgressChart2({
          data: [
            _.sumBy(
              _.filter(res.data.Data, function (o) {
                return o.CoTichLuy && o.DiemHe4 >= 0;
              }),
              "SoTinChi"
            ) / 120,
          ],
        });

        let listLabel = [],
          listData = [];
        listDiemTBTheoHK.forEach((item) => {
          listLabel.push(item.Ky);
          listData.push(parseFloat((item.DiemTong / item.soTC).toFixed(2)));
        });
        setDataLineChart({
          labels: listLabel,
          datasets: [
            {
              data: listData,
              color: (opacity = 1) => `rgba(48, 118, 241, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
            {
              data: [4],
              color: () => "rgba(0, 0, 0, 0)",
            },
          ],
          legend: [], // optional
        });
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
    <SafeAreaProvider>
      <View
        style={{
          borderBottomWidth: 0.5,
          width: WIDTH,
          marginVertical: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#3076F1",
            marginHorizontal: 10,
          }}
        >
          Tổng quan
        </Text>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            navigation.push("StudyResultDetail", {
              subjects,
            });
          }}
        >
          <Text style={{ color: "#3076F1", fontSize: 16 }}>
            Chi tiết{" "}
            <FontAwesome name="chevron-right" size={15} color="#3076F1" />
          </Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#65A5F6", "#3076F1"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          padding: 6,
          alignItems: "center",
          borderRadius: 16,
          margin: 10,
          height: HEIGHT * 0.1,
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
      </LinearGradient>

      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <ScrollView horizontal={true}>
          <LineChartWithTooltips
            data={dataLineChart}
            width={WIDTH + 50}
            height={HEIGHT * 0.3}
            fromZero
            withOuterLines={false}
            verticalLabelRotation={0}
            chartConfig={{
              strokeWidth: 20,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.5) => `rgba(48, 118, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              fillShadowGradientOpacity: 0.7,
              fillShadowGradient: "#3076F1",
              barRadius: 32,
              useShadowColorFromDataset: false, // optional
            }}
            bezier
            segments={4}
          />
        </ScrollView>
      </View>

      <View
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT * 0.3,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: WIDTH * 0.46,
            height: HEIGHT * 0.26,
            backgroundColor: "#fff",
            borderRadius: 16,
            position: "absolute",
            left: 10,
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}>
            Điểm tích lũy
          </Text>
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              elevation: 999,
              zIndex: 999,
              top: "50%",
              left: "37%",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {diemTrungBinh}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 16, color: "#bcbcbc" }}
            >
              Hệ 4
            </Text>
          </View>
          <ProgressChart
            data={dataProgressChart}
            width={WIDTH * 0.46}
            height={HEIGHT * 0.242}
            strokeWidth={6}
            radius={60}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(48, 118, 241, ${opacity})`,
              barPercentage: 0.5,
            }}
            hideLegend={true}
          />
        </View>

        <View
          style={{
            width: WIDTH * 0.46,
            height: HEIGHT * 0.26,
            backgroundColor: "#fff",
            borderRadius: 16,
            position: "absolute",
            right: 10,
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}>
            Tín chỉ tích lũy
          </Text>
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              elevation: 999,
              zIndex: 999,
              top: "50%",
              left: "37%",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {tongSoTinChi}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 16, color: "#bcbcbc" }}
            >
              /120
            </Text>
          </View>
          <ProgressChart
            data={dataProgressChart2}
            width={WIDTH * 0.46}
            height={HEIGHT * 0.242}
            strokeWidth={6}
            radius={60}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(247, 113, 86, ${opacity})`,
              barPercentage: 0.5,
            }}
            hideLegend={true}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const StudyResultDetail = ({
  route,
  navigation,
  studentProfile,
  hocKyTacNghiep,
}) => {
  const [loading, setLoading] = useState(true);
  const [hocKy, setHocKy] = useState("");
  const [listHocKy, setListHocKy] = useState([]);
  const [subjectsSemester, setSubjectsSemester] = useState([]);
  const [tongSoTinChi, setTongSoTinChi] = useState(0);
  const [diemTrungBinhHe10, setDiemTrungBinhHe10] = useState(0.0);
  const [diemTrungBinhHe4, setDiemTrungBinhHe4] = useState(0.0);
  var { subjects } = route.params;
  useEffect(() => {
    let subjectsSemesterTemp = [],
      listHocKyTemp = [];
    subjects.forEach((subject) => {
      listHocKyTemp.push(subject.HocKyTinhTichLuy);
      if (subject.HocKyTinhTichLuy === hocKyTacNghiep.MaHocKy) {
        subjectsSemesterTemp.push(subject);
      }
    });
    let diemTongHe10 = 0,
      diemTongHe4 = 0,
      soTinChiTemp = _.sumBy(
        _.filter(subjectsSemesterTemp, function (o) {
          return o.CoTichLuy && o.DiemHe4 >= 0;
        }),
        "SoTinChi"
      );

    setTongSoTinChi(soTinChiTemp);

    subjectsSemesterTemp.forEach((item) => {
      if (item.CoTichLuy) {
        diemTongHe10 += item.DiemHe10 >= 0 ? item.DiemHe10 * item.SoTinChi : 0;
        diemTongHe4 += item.DiemHe4 >= 0 ? item.DiemHe4 * item.SoTinChi : 0;
      }
    });

    setDiemTrungBinhHe10((diemTongHe10 / soTinChiTemp).toFixed(2));
    setDiemTrungBinhHe4((diemTongHe4 / soTinChiTemp).toFixed(2));
    setListHocKy([...new Set(listHocKyTemp)].reverse());
    setSubjectsSemester(subjectsSemesterTemp);
    setHocKy(hocKyTacNghiep.MaHocKy);
    setLoading(false);
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
              let subjectsSemesterTemp = [];
              subjects.forEach((subject) => {
                if (subject.HocKyTinhTichLuy === value) {
                  subjectsSemesterTemp.push(subject);
                }
              });
              let diemTongHe10 = 0,
                diemTongHe4 = 0,
                soTinChiTemp = _.sumBy(
                  _.filter(subjectsSemesterTemp, function (o) {
                    return o.CoTichLuy && o.DiemHe4 >= 0;
                  }),
                  "SoTinChi"
                );
              setTongSoTinChi(soTinChiTemp);
              subjectsSemesterTemp.forEach((item) => {
                if (item.CoTichLuy) {
                  diemTongHe10 +=
                    item.DiemHe10 >= 0 ? item.DiemHe10 * item.SoTinChi : 0;
                  diemTongHe4 +=
                    item.DiemHe4 >= 0 ? item.DiemHe4 * item.SoTinChi : 0;
                }
              });
              setDiemTrungBinhHe10((diemTongHe10 / soTinChiTemp).toFixed(2));
              setDiemTrungBinhHe4((diemTongHe4 / soTinChiTemp).toFixed(2));
              setSubjectsSemester(subjectsSemesterTemp);
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
            <Text style={{ fontSize: 16, color: "#fff" }}>
              Tín chỉ tích lũy
            </Text>
          </View>
          <View
            style={{
              borderLeftWidth: 0.5,
              borderColor: "#FFF",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>
              {diemTrungBinhHe10} / {diemTrungBinhHe4}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>Điểm trung bình</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={subjectsSemester}
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
                {item.TenHocPhan}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Số tín chỉ: {item.SoTinChi}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Điểm trung bình (Hệ 4): {item.DiemHe4.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Điểm trung bình (Hệ 10): {item.DiemHe10.toFixed(2)}
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
                  {item.DiemChu}
                </Text>
              </View>
              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => {
                  navigation.navigate("Subject", {
                    TenHocPhan: item.TenHocPhan,
                    MaHocPhan: item.MaHocPhan,
                  });
                }}
              >
                <Text style={{ color: "#3076F1" }}>
                  Thông tin{" "}
                  <FontAwesome name="chevron-right" size={15} color="#3076F1" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => `${item.MaHocPhan}`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    hocKyTacNghiep: state.hocKyTacNghiep,
    studentProfile: state.studentProfile,
  };
};

const StudyResultConnect = connect(mapStateToProps, null)(StudyResult);

const StudyResultDetailConnect = connect(
  mapStateToProps,
  null
)(StudyResultDetail);

const Stack = createStackNavigator();

export default StudyResultStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudyResult"
        component={StudyResultConnect}
        options={{
          headerTitleAlign: "center",
          title: "Kết quả học tập",
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
        name="StudyResultDetail"
        component={StudyResultDetailConnect}
        options={{
          headerTitleAlign: "center",
          title: "Chi tiết",
        }}
      />
      <Stack.Screen
        name="Subject"
        component={Subject}
        options={({ route }) => ({
          title: route.params.TenHocPhan,
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
