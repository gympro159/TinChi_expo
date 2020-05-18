import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import Subject from "./../Subject/Subject";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import ListSemester from "../../components/ListSemesterResult/ListSemesterResult";
import Course from "../Course/Course";

const WIDTH = Dimensions.get("window").width;

const StudyResult = ({ navigation }) => {

  const [titleTable, setTitleTable] = useState([
    "Mã HP",
    "Tên Học phần",
    "Hệ\n10",
    "Điểm\nchữ",
    "Hệ\n4"
  ]);

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
          he4: 3.0
        },
        {
          maHP: "TIN1013",
          tenHP: "Tin học đại cương",
          he10: 7.4,
          diemChu: "B",
          he4: 3.0
        },
        {
          maHP: "TIN1042",
          tenHP: "Kỹ thuật lập trình 1",
          he10: 8.4,
          diemChu: "B",
          he4: 3.0
          
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
          he4: 4.0
        },
        {
          maHP: "TIN3133",
          tenHP: "Đồ hoạ máy tính",
          he10: 8.9,
          diemChu: "A",
          he4: 4.0
        },
        {
          maHP: "TIN3053",
          tenHP: "Các hệ quản trị cơ sở dữ liệu",
          he10: 8.7,
          diemChu: "A",
          he4: 4.0
        },
      ],
    },
  ]);
  return (
    <View>
      <TableWrapper borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
        <Row
          data={titleTable}
          style={styles.titleTable}
          textStyle={styles.titleTableText}
          widthArr={[WIDTH * 0.22, WIDTH * 0.39, WIDTH * 0.13, WIDTH * 0.13, WIDTH * 0.13]}
        />
      </TableWrapper>

      <FlatList
        data={contentTable}
        renderItem={({ item, index }) => (
          <ListSemester
            semesterContent={item}
            index={index}
            lengthList={contentTable.length}
            onPressSubject={(index) => {
              navigation.navigate("Subject", {
                subject: item.course[index].tenHP,
                maHP: item.course[index].maHP
              });
            }}
          />
        )}
        keyExtractor={(item) => `${item.year}-${item.semester}`}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default StudyResultStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudyResult"
        component={StudyResult}
        options={{
          headerTitleAlign: "center",
          title: "Kết quả học tập",
          headerLeft: () => (
            <Icon
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
          title: route.params.course.tenLHP,
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
