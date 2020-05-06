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
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell,
} from "react-native-table-component";
import ListSemester from "../../components/ListSemesterHistory/ListSemesterHistory";

const WIDTH = Dimensions.get("window").width;

const HistoryOfStudying = ({ navigation }) => {
  const [titleTable, setTitleTable] = useState([
    "Mã HP",
    "Lớp Học phần",
    "Điểm thi",
    "Tổng điểm",
  ]);

  const [contentTable, setContentTable] = useState([
    {
      year: "2016-2017",
      semester: 1,
      course: [
        {
          maHP: "CTR1012",
          maLHP: "2016-2017.1.CTR1012.004",
          lopHP: "Những nguyên lí cơ bản của chủ nghĩa Mác-Lênin 1 - Nhóm 4",
          diemThi: 5.5,
          tongDiem: 7.0,
        },
        {
          maHP: "TIN1013",
          maLHP: "2016-2017.1.TIN1013.005",
          lopHP: "Tin học đại cương - Nhóm 5",
          diemThi: 7.0,
          tongDiem: 7.4,
        },
        {
          maHP: "TIN1042",
          maLHP: "2016-2017.1.TIN1042.003",
          lopHP: "Kỹ thuật lập trình 1 - Nhóm 3",
          diemThi: 8.0,
          tongDiem: 8.4,
        },
      ],
    },
    {
      year: "2016-2017",
      semester: 2,
      course: [
        {
          maHP: "MTR1022",
          maLHP: "2016-2017.2.MTR1022.006",
          lopHP: "Giáo dục môi trường đại cương - Nhóm 6",
          diemThi: 8.3,
          tongDiem: 8.7,
        },
        {
          maHP: "TIN3133",
          maLHP: "2016-2017.2.TIN3133.001",
          lopHP: "Đồ hoạ máy tính - Nhóm 1",
          diemThi: 9.5,
          tongDiem: 8.9,
        },
        {
          maHP: "TIN3053",
          maLHP: "2016-2017.2.TIN3053.002",
          lopHP: "Các hệ quản trị cơ sở dữ liệu - Nhóm 2",
          diemThi: 8.3,
          tongDiem: 8.7,
        },
      ],
    },
  ]);
  return (
    <View>
      <Table borderStyle={{ borderColor: "#777", borderWidth: 1 }}>
        <Row
          data={titleTable}
          style={styles.titleTable}
          textStyle={styles.titleTableText}
          widthArr={[WIDTH * 0.22, WIDTH * 0.52, WIDTH * 0.13, WIDTH * 0.13]}
        />
      </Table>

      <FlatList
        data={contentTable}
        renderItem={({ item, index }) => (
          <ListSemester
            semesterContent={item}
            index={index}
            lengthList={contentTable.length}
            onPressCourse={(index) => {
              navigation.navigate("Course", {
                course: item.course[index].maLHP,
              });
            }}
            onPressSubject={(index) => {
              navigation.navigate("Subject", {
                subject: item.course[index].maHP,
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

export default HistoryOfStudyingStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryOfStudying"
        component={HistoryOfStudying}
        options={{
          headerTitleAlign: "center",
          title: "Lịch sử quá trình học tập",
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
          title: route.params.course,
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
    marginTop: 20,
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
