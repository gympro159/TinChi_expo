import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import Course from "./../Course/Course";
import Subject from "./../Subject/Subject";
import _ from "lodash";

const WIDTH = Dimensions.get("window").width;

const ScheduleOfExam = ({ navigation }) => {
  const tableTitle = ["Lớp học phần", "Lần thi", "Ngày thi", "Phòng thi"];

  const [listSchedules, setListSchedules] = useState([
    {
      maLHP: "2019-2020.1.TIN4483.002",
      tenLHP: "Xây dựng ứng dụng với .NET FrameWork - Nhóm 2",
      lanThi: 1,
      ngayThi: "23/12/2019",
      gioThi: "07g30",
      phongThi: "Lab 3_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4133.001",
      tenLHP: "	Quản trị dự án phần mềm - Nhóm 1",
      lanThi: 1,
      ngayThi: "26/12/2019",
      gioThi: "13g30",
      phongThi: "H201",
      hinhThucThi: "Tự luận",
    },
    {
      maLHP: "2019-2020.1.TIN4113.001",
      tenLHP: "	Quy trình phát triển phần mềm - Nhóm 1",
      lanThi: 1,
      ngayThi: "28/12/2019",
      gioThi: "13g30",
      phongThi: "Lab 5_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4183.002",
      tenLHP: "Kiểm định phần mềm - Nhóm 2",
      lanThi: 1,
      ngayThi: "02/01/2020",
      gioThi: "07g30",
      phongThi: "E303",
      hinhThucThi: "Tự luận",
    },
    {
      maLHP: "2019-2020.1.TIN4253.001",
      tenLHP: "Mẫu thiết kế - Nhóm 1",
      lanThi: 1,
      ngayThi: "04/01/2020",
      gioThi: "07g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4403.003",
      tenLHP: "Lập trình ứng dụng cho các thiết bị di động - Nhóm 3",
      lanThi: 2,
      ngayThi: "07/01/2020",
      gioThi: "07g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
    {
      maLHP: "2019-2020.1.TIN4013.004",
      tenLHP: "Java nâng cao - Nhóm 4",
      lanThi: 1,
      ngayThi: "11/01/2020",
      gioThi: "13g30",
      phongThi: "Lab 1_CNTT",
      hinhThucThi: "Phòng máy tính",
    },
  ]);

  const cellContent = (value) => {
    return (
      <TouchableOpacity onPress={() => navigation.push("Course")}>
        <Text style={{ color: "#337ab7", textAlign: "center" }}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const handleListSchedules = () => {
    var result = [];
    listSchedules.forEach((schedule) => {
      let row = [
        cellContent(schedule.tenLHP),
        `${schedule.lanThi}`,
        `${schedule.ngayThi}\n${schedule.gioThi}`,
        `${schedule.phongThi}\n${schedule.hinhThucThi}`,
      ];
      result.push(row);
    });
    return result;
  };

  const [tableContent, setTableContent] = useState(() => handleListSchedules());
  //const tableContent = () => handleListConduct();

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5, width: WIDTH, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          LỊCH THI KẾT THÚC HỌC PHẦN
        </Text>
      </View>
      <Table borderStyle={{ borderColor: "#DBDBDB", borderWidth: 1 }}>
        <Row
          data={tableTitle}
          style={styles.head}
          textStyle={styles.text}
          widthArr={[WIDTH * 0.3, WIDTH * 0.12, WIDTH * 0.29, WIDTH * 0.29]}
        />
      </Table>
      <ScrollView>
        <Table borderStyle={{ borderColor: "#DBDBDB", borderWidth: 1 }}>
          <Rows
            data={tableContent}
            textStyle={styles.text}
            widthArr={[WIDTH * 0.3, WIDTH * 0.12, WIDTH * 0.29, WIDTH * 0.29]}
          />
        </Table>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default ScheduleOfExamStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScheduleOfExam"
        component={ScheduleOfExam}
        options={{
          headerTitleAlign: "center",
          title: "Lịch thi",
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
        component={Subject}
        options={{
          headerTitleAlign: "center",
          title: "Thông tin Lớp học phần",
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
  head: {
    backgroundColor: "#D2D2D2",
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 13,
  },
});
