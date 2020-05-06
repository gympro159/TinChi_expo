import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import Course from "./../Course/Course";

const WIDTH = Dimensions.get("window").width;

const TimeTable = ({ navigation }) => {
  const dateTable = () => {
    const date = [""];
    for (let i = 0; i < 7; i++) {
      date.push(`${timeTable[i].weekDay}\n${timeTable[i].dateDay}`);
    }
    return date;
  };

  const cellContent = value => {
    if (value.length > 0) {
      return (
        <FlatList
          data={value}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Course", {
                  courseName: item.name
                });
              }}
            >
              <View
                style={
                  value.length > 1 && index > 0
                    ? { borderTopColor: "grey", borderTopWidth: 1 }
                    : {}
                }
              >
                <Text style={{ color: "#337ab7", textAlign: "center" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "grey", textAlign: "center" }}>
                  {item.periodStart}-{item.periodEnd} [{item.room}]
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => `${item.name}`}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      );
    }
  };

  const tableContent = () => {
    let content = [];
    for (let i = 0, l = timeTable.length; i < l; i++) {
      let morning = [],
        afternoon = [],
        night = [];
      timeTable[i].course.map(ACourse => {
        if (ACourse.periodStart > 8) {
          night.push(ACourse);
        } else if (ACourse.periodStart > 4) {
          afternoon.push(ACourse);
        } else morning.push(ACourse);
      });
      let contentADay = [
        `${timeTable[i].weekDay}\n${timeTable[i].dateDay}`,
        cellContent(morning),
        cellContent(afternoon),
        cellContent(night)
      ];
      content.push(contentADay);
    }
    return content;
  };

  const [timeTable, setTimeTable] = useState([
    {
      dateDay: "23/03/2020",
      weekDay: "Thứ 2",
      course: [
        {
          name: "Lập trình hướng đối tượng",
          periodStart: 1,
          periodEnd: 2,
          room: "Lab 5_CNTT"
        },
        {
          name: "Cấu trúc dữ liệu và thuật toán",
          periodStart: 3,
          periodEnd: 4,
          room: "Lab 1_CNTT"
        },
        {
          name: "Nhập môn trí tuệ nhân tạo",
          periodStart: 9,
          periodEnd: 11,
          room: "E404"
        }
      ]
    },
    {
      dateDay: "24/03/2020",
      weekDay: "Thứ 3",
      course: [
        {
          name: "Lập trình ứng dụng di động",
          periodStart: 2,
          periodEnd: 4,
          room: "Lab 3_CNTT"
        }
      ]
    },
    {
      dateDay: "25/03/2020",
      weekDay: "Thứ 4",
      course: [
        {
          name: "Ngôn ngữ truy vấn có cấu trúc (SQL)",
          periodStart: 6,
          periodEnd: 8,
          room: "Lab 2_CNTT"
        }
      ]
    },
    {
      dateDay: "26/03/2020",
      weekDay: "Thứ 5",
      course: []
    },
    {
      dateDay: "27/03/2020",
      weekDay: "Thứ 6",
      course: [
        {
          name: "Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin 2",
          periodStart: 9,
          periodEnd: 11,
          room: "E304"
        }
      ]
    },
    {
      dateDay: "28/03/2020",
      weekDay: "Thứ 7",
      course: []
    },
    {
      dateDay: "29/03/2020",
      weekDay: "Chủ nhật",
      course: []
    }
  ]);
  const [tableHead, setTableHead] = useState([
    "",
    "BUỔI SÁNG",
    "BUỔI CHIỀU",
    "BUỔI TỐI"
  ]);
  const [tableTitle, setTableTitle] = useState(() => dateTable());

  //Tạo tiếp content Course
  const [content, setContent] = useState(() => tableContent());
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <TableWrapper borderStyle={{ borderColor: "grey", borderWidth: 2 }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.text}
              widthArr={[107, 200, 200, 200]}
            />
          </TableWrapper>
          <ScrollView>
            <Table borderStyle={{ borderColor: "grey", borderWidth: 2 }}>
              <Rows
                data={content}
                textStyle={styles.text}
                widthArr={[105, 200, 200, 200]}
              />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
          )
        }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={({ route }) => ({
          title: route.params.courseName,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: WIDTH - 100
          }
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff"
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff"
  },
  text: {
    margin: 6,
    textAlign: "center"
  }
});
