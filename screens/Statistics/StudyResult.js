import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import LineChartWithTooltips from "./../../components/LineChartWithTooltip/LineChartWithTooltip";
import Subject from "./../Subject/Subject";
import ListSemester from "../../components/ListSemesterResult/ListSemesterResult";
import Course from "../Course/Course";
import Compose from "./../GeneralFunctions/Compose";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const StudyResult = ({ navigation, studentProfile }) => {
  const dataLineChart = {
    labels: ["Kỳ 1", "Kỳ 2", "Kỳ 3", "Kỳ 4", "Kỳ 5", "Kỳ 6", "Kỳ 7", "Kỳ 8"],
    datasets: [
      {
        data: [2.8, 3.2, 3.6, 2.5, 3.3, 2.7, 3.1, 3.3],
        color: (opacity = 1) => `rgba(48, 118, 241, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [4],
        color: () => "rgba(0, 0, 0, 0)",
      },
    ],
    legend: [], // optional
  };
  const dataProgressChart = {
    data: [0.875],
  };
  const dataProgressChart2 = {
    data: [0.7],
  };

  return (
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
            navigation.push("StudyResultDetail");
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
              3.5
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
              86
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 16, color: "#bcbcbc" }}
            >
              /118
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

const StudyResultDetail = ({ navigation, studentProfile }) => {
  const [hocKy, setHocKy] = useState("Học kỳ 2 - 2016-2017");
  const [contentTable, setContentTable] = useState([
    {
      year: "2016-2017",
      semester: 1,
      course: [
        {
          maHP: "CTR1012",
          tenHP: "Những nguyên lí cơ bản của chủ nghĩa Mác-Lênin 1",
          he10: 7.0,
          diemChu: "B",
          he4: 3.0,
        },
        {
          maHP: "TIN1013",
          tenHP: "Tin học đại cương",
          he10: 7.4,
          diemChu: "B",
          he4: 3.0,
        },
        {
          maHP: "TIN1042",
          tenHP: "Kỹ thuật lập trình 1",
          he10: 5.0,
          diemChu: "D",
          he4: 1.0,
        },
      ],
    },
    {
      year: "2016-2017",
      semester: 2,
      course: [
        {
          maHP: "MTR1022",
          tenHP: "Giáo dục môi trường đại cương",
          he10: 8.7,
          diemChu: "A",
          he4: 4.0,
        },
        {
          maHP: "TIN3133",
          tenHP: "Đồ hoạ máy tính",
          he10: 8.9,
          diemChu: "A",
          he4: 4.0,
        },
        {
          maHP: "TIN3053",
          tenHP: "Các hệ quản trị cơ sở dữ liệu",
          he10: 8.7,
          diemChu: "A",
          he4: 4.0,
        },
      ],
    },
  ]);

  return (
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
                      {item.tenHP}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#808080" }}>
                      Điểm trung bình (Hệ 10): {item.he10.toFixed(1)}
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
                        navigation.navigate("Subject", {
                          subject: item.tenHP,
                          maHP: item.maHP,
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
              keyExtractor={(item) => `${item.maHP}`}
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
          title: route.params.subject,
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
