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
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import _ from "lodash";
import axios from "axios";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import CourseStackScreen from "./../Course/Course";
import Subject from "./../Subject/Subject";

const { width, height } = Dimensions.get("window");

const TimeTable = ({ navigation }) => {
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
                    maHP: item.maHP,
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#337ab7",
                  }}
                >
                  {item.tenHP}
                </Text>
              </TouchableOpacity>
              <Text style={{ textAlign: "center" }}>
                {item.maHP}
                {"\n"}
                <Text style={{ color: "grey" }}>[{item.lichHoc}]</Text>
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

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [scheduleWeekSelected, setScheduleWeekSelected] = useState(0);
  const [scheduleDaySelected, setScheduleDaySelected] = useState(0);
  const [btnGroupPress, setBtnGroupPress] = useState([]);
  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
      axios.get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/schedule`),
    ]).then(([subjectRes, courseRes, scheduleRes]) => {
      setSubjects(subjectRes.data);
      setCourses(courseRes.data);
      setSchedule(_.chunk(scheduleRes.data, 7));
      var date = new Date(),
        dateFormat = `${
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
        }/${
          date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)
        }/${date.getFullYear()}`;
      for (let i = 0; i < _.chunk(scheduleRes.data, 7).length; i++) {
        let check = 0;
        for (let j = 0; j < 7; j++) {
          if (_.chunk(scheduleRes.data, 7)[i][j].day === dateFormat) {
            check = 1;
            setBtnGroupPress(_.fill([false, false, false, false, false, false, false], true, j, j + 1));
            setTableContent(
              handleTableContent(_.chunk(scheduleRes.data, 7), i, j)
            );
            setScheduleWeekSelected(i);
            setScheduleDaySelected(j);
            break;
          }
        }
        if (check) break;
      }
    });
  }, []);

  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 6,
          borderColor: "#dbdbdb",
          backgroundColor: "#f2f2f2",
          marginHorizontal: 10,
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
              heightArr={[height * 0.27, height * 0.27, height * 0.25]}
              width={56}
              style={{ backgroundColor: "#F9F9F9" }}
              textStyle={{ textAlign: "center" }}
            />
            <Col
              data={tableContent}
              heightArr={[height * 0.27, height * 0.27, height * 0.25]}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
    </>
  );
};

const Stack = createStackNavigator();

export default TimeTableStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TimeTable"
        component={TimeTable}
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
        name="CourseStackScreen"
        component={CourseStackScreen}
        options={({ route }) => ({
          title: route.params.course.tenLHP,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: width - 100,
          },
        })}
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
    borderTopLeftRadius: 10
  },
  buttonTitleStyle: {
    color: "#337AB7",
    fontSize: 13,
  },
  buttonStylePress: {
    backgroundColor: "#337AB7",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  buttonTitleStylePress: {
    color: "#fff",
    fontSize: 13,
  },
});
