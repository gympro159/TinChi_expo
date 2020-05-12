import React, { useState, useEffect } from "react";
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
import axios from "axios";
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

  const [contentTable, setContentTable] = useState([]);

  const [courses, setCourses] = useState([])
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
    ])
    .then(([subjectRes,courseRes])=>{
      setSubjects(subjectRes.data);
      setCourses(courseRes.data);
      let tableContentTemp = []
      courseRes.data.forEach(course => {
          let check = 0;
          for(let tableSemester of tableContentTemp){
            if(tableSemester.year === course.namHoc && tableSemester.semester === course.hocKy){
              tableSemester.course.push({
                maHP: course.maHP,
                maLHP: course.maLHP,
                lopHP: course.tenLHP,
                diemThi: (course.diemThi2===null)?course.diemThi1:course.diemThi2,
                tongDiem: (course.tongDiem2===null)?course.tongDiem1:course.tongDiem2,
              });
              check =1;
            } 
          }
          if(check===0) {
            tableContentTemp.push({
              year: course.namHoc,
              semester: course.hocKy,
              course: [{
                maHP: course.maHP,
                maLHP: course.maLHP,
                lopHP: course.tenLHP,
                diemThi: (course.diemThi2===null)?course.diemThi1:course.diemThi2,
                tongDiem: (course.tongDiem2===null)?course.tongDiem1:course.tongDiem2,
              }]
            })
          }
      })
      setContentTable(tableContentTemp)
    })
  }, [])
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
              let courseParam = {}, subjectParam = {};
              for(let course of courses) {
                if(course.maLHP === item.course[index].maLHP){
                  courseParam= {...course};
                  break;
                }
              }
              for(let subject of subjects) {
                if(subject.maHP === item.course[index].maHP){
                  subjectParam= {...subject};
                  break;
                }
              }
              navigation.navigate("Course", {
                course: courseParam,
                subject: subjectParam
              });
            }}
            onPressSubject={(index) => {
              navigation.navigate("Subject", {
                maHP: item.course[index].maHP,
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
          title: route.params.maHP,
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
