import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Picker,
} from "react-native";
import { Text, Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import _ from "lodash";
import axios from "axios";
import { Table, TableWrapper, Col } from "react-native-table-component";
import Spinner from "react-native-loading-spinner-overlay";
import {
  getDateFormat,
  getLocalDateFormat,
  getDateISOStringZoneTime,
} from "./../../constants/common";
import Course from "./../Course/Course";
import Compose from "./Compose";
import Subject from "./../Subject/Subject";

const { width, height } = Dimensions.get("window");

const TimeTable = ({ navigation, thoiKhoaBieu }) => {
  const cellContent = (value) => {
    return value.length > 0 ? (
      <View>
        {value.map((item, index) => {
          return (
            <View
              key={index}
              style={
                value.length > 1 && index > 0
                  ? {
                      borderTopColor: "#dbdbdb",
                      borderTopWidth: 0.5,
                      paddingTop: 10,
                      marginTop: 5,
                      marginHorizontal: 10,
                    }
                  : {}
              }
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Subject", {
                    maHP: item.maLHP,
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#3076F1",
                  }}
                >
                  {item.TenLopHocPhan}
                </Text>
              </TouchableOpacity>
              <Text style={{ textAlign: "center" }}>
                {item.MaLopHocPhan}
                {"\n"}
                <Text style={{ color: "grey" }}>
                  [{item.TietBatDau}-{item.TietKetThuc}, {item.TenPhongHoc}]
                </Text>
              </Text>
            </View>
          );
        })}
      </View>
    ) : (
      <View></View>
    );
  };

  const handleTableContent = (scheduleParam, i, j) => {
    let content = [
      cellContent(scheduleParam[i][j].sang),
      cellContent(scheduleParam[i][j].chieu),
      cellContent(scheduleParam[i][j].toi),
    ];
    return content;
  };

  const [schedule, setSchedule] = useState([]);
  const [scheduleWeekSelected, setScheduleWeekSelected] = useState(0);
  const [scheduleDaySelected, setScheduleDaySelected] = useState(0);
  const [btnGroupPress, setBtnGroupPress] = useState([true, false, false, false, false, false, false]);
  const [tableContent, setTableContent] = useState([[], [], []]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    var dateStartTemp = new Date(thoiKhoaBieu[0].NgayHoc),
      dateEndTemp = new Date(thoiKhoaBieu[thoiKhoaBieu.length - 1].NgayHoc);
    dateStartTemp.setDate(
      dateStartTemp.getDay() === 0
        ? dateStartTemp.getDate() - 6
        : dateStartTemp.getDate() - dateStartTemp.getDay() + 1
    );
    dateEndTemp.setDate(
      dateStartTemp.getDay() === 0
        ? dateStartTemp.getDate() - 6
        : dateEndTemp.getDate() - dateEndTemp.getDay() + 7
    );
    var scheduleMain = [];
    for (let i = dateStartTemp; i <= dateEndTemp; i.setDate(i.getDate() + 1)) {
      scheduleMain.push({
        day: getDateFormat(i),
        dayISO: getDateISOStringZoneTime(i),
        sang: [],
        chieu: [],
        toi: [],
      });
    }
    scheduleMain.forEach((day) => {
      for (let i = 0, len = thoiKhoaBieu.length; i < len; i++) {
        if (day.dayISO === thoiKhoaBieu[i].NgayHoc) {
          if (thoiKhoaBieu[i].TietBatDau >= 9) {
            day.toi.push(thoiKhoaBieu[i]);
          } else if (thoiKhoaBieu[i].TietBatDau >= 5) {
            day.chieu.push(thoiKhoaBieu[i]);
          } else day.sang.push(thoiKhoaBieu[i]);
        }
      }
    });
    var scheduleTemp = _.chunk(scheduleMain, 7);
    
    for (let i = 0; i < scheduleTemp.length; i++) {
      let kt = 1;
      for (let j = 0; j < 7; j++) {
        if (
          scheduleTemp[i][j].sang.length > 0 ||
          scheduleTemp[i][j].chieu.length > 0 ||
          scheduleTemp[i][j].toi.length > 0
        ) {
          kt = 0;
          break;
        }
      }
      if (kt === 1) {
        scheduleTemp.splice(i, 1);
        i--;
      }
    }

    setSchedule(scheduleTemp);
    setTableContent(handleTableContent(scheduleTemp, 0, 0)); // set tạm thời khóa biểu ngày đầu tiên

    var dateFormat = getDateISOStringZoneTime(new Date());
    for (let i = 0; i < scheduleTemp.length; i++) {
      let check = 0;
      for (let j = 0; j < 7; j++) {
        if (scheduleTemp[i][j].dayISO === dateFormat) {
          check = 1;
          setBtnGroupPress(
            _.fill(
              [false, false, false, false, false, false, false],
              true,
              j,
              j + 1
            )
          );
          setTableContent(handleTableContent(scheduleTemp, i, j)); //set thời khóa biểu hôm nay
          setScheduleWeekSelected(i);
          setScheduleDaySelected(j);
          break;
        }
      }
      if (check) break;
    }
    setLoading(false);
  }, [thoiKhoaBieu]);

  return loading ? (
    <Spinner
      visible={loading}
      textContent={"Đang tải..."}
      textStyle={{ color: "#fff" }}
    />
  ) : (
    <SafeAreaProvider>
      <View style={{ justifyContent: "flex-start" }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: "#dbdbdb",
            backgroundColor: "#fff",
            marginHorizontal: 2,
            marginBottom: 0,
          }}
        >
          <Picker
            selectedValue={scheduleWeekSelected}
            style={{ height: 40, width: undefined }}
            onValueChange={(value) => {
              setScheduleWeekSelected(value);
              setTableContent(
                handleTableContent(schedule, value, scheduleDaySelected)
              );
            }}
          >
            {schedule.map((scheduleWeek, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={`Từ ${scheduleWeek[0].day} đến ${scheduleWeek[6].day}`}
                  value={index}
                />
              );
            })}
          </Picker>
        </View>
        <FlatList
          horizontal={true}
          //showsHorizontalScrollIndicator={false}
          data={[
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
            "Chủ nhật",
          ]}
          renderItem={({ item, index }) => (
            <Button
              key={index}
              title={`${item}`}
              buttonStyle={
                btnGroupPress[index]
                  ? styles.buttonStylePress
                  : styles.buttonStyle
              }
              titleStyle={
                btnGroupPress[index]
                  ? styles.buttonTitleStylePress
                  : styles.buttonTitleStyle
              }
              onPress={() => {
                setBtnGroupPress(
                  _.fill(
                    [false, false, false, false, false, false, false],
                    true,
                    index,
                    index + 1
                  )
                );
                setScheduleDaySelected(index);
                setTableContent(
                  handleTableContent(schedule, scheduleWeekSelected, index)
                );
              }}
            />
          )}
          keyExtractor={(index) => `${index}`}
          contentContainerStyle={{
            marginLeft: 1,
            marginBottom: 0,
          }}
        />
        <ScrollView>
          <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
            <TableWrapper style={{ flexDirection: "row" }}>
              <Col
                data={["Buổi sáng", "Buổi chiều", "Buổi tối"]}
                heightArr={[height * 0.25, height * 0.25, height * 0.22]}
                width={56}
                style={{ backgroundColor: "#F9F9F9" }}
                textStyle={{ textAlign: "center" }}
              />
              <Col
                data={tableContent}
                style={{ backgroundColor: "#fff" }}
                heightArr={[height * 0.25, height * 0.25, height * 0.22]}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    thoiKhoaBieu: state.thoiKhoaBieu,
  };
};

const TimeTableConnect = connect(mapStateToProps, null)(TimeTable);

const Stack = createStackNavigator();

export default TimeTableStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TimeTable"
        component={TimeTableConnect}
        options={{
          headerTitleAlign: "center",
          title: "Thời khóa biểu",
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
            width: width - 100,
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
  buttonStyle: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonTitleStyle: {
    color: "#3076F1",
    fontSize: 13,
  },
  buttonStylePress: {
    backgroundColor: "#3076F1",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonTitleStylePress: {
    color: "#fff",
    fontSize: 13,
  },
});
