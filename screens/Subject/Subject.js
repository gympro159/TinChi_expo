import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import ListStudyTimes from "./../../components/ListStudyTimes/ListStudyTimes";

const WIDTH = Dimensions.get("window").width;

export default Subject = ({ navigation, route }) => {
  const [subject, setSubject] = useState({});
  const [courses, setCourses] = useState([]);
  const [titleTable, setTitleTable] = useState(["", "Thi lần 1", "Thi lần 2"]);
  const [titleTable2, setTitleTable2] = useState([
    "Lần học",
    "Điểm QTHT",
    "Điểm Thi",
    "Tổng điểm",
    "Điểm Thi",
    "Tổng điểm",
  ]);
  useEffect(() => {
    Promise.all([
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/subject`),
      axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/course`),
    ])
      .then(([subjectRes, courseRes]) => {
        for (let sub of subjectRes.data) {
          if (sub.maHP === route.params.maHP) {
            setSubject(sub);
            let listCourse = [];
            courseRes.data.forEach((course) => {
              if (course.maHP === sub.maHP) {
                listCourse.push(course);
              }
            });
            setCourses(listCourse);
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#004275",
          marginLeft: 10,
        }}
      >
        THÔNG TIN VỀ HỌC PHẦN
      </Text>
      <ScrollView>
        <Text style={styles.title}>Thông tin chung:</Text>
        <View style={styles.content}>
          <Text style={styles.label}>Tên học phần: </Text>
          <Text style={styles.input}>{subject.tenHP}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Mã học phần: </Text>
          <Text style={styles.input}>{subject.maHP}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Số tín chỉ: </Text>
          <Text style={styles.input}>{subject.soTinChi}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Loại học phần: </Text>
          <Text style={styles.input}>{subject.loaiHP}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Trình độ đào tạo: </Text>
          <Text style={styles.input}>{subject.trinhDoDaoTao}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.label}>Đơn vị phụ trách: </Text>
          <Text style={styles.input}>{subject.donViPhuTrach}</Text>
        </View>

        {subject.daDK && (
          <>
            <Text style={styles.title}>
              Lịch sử quá trình học đối với học phần:
            </Text>
            <TableWrapper
              borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}
            >
              <Row
                data={titleTable}
                style={styles.titleTable}
                textStyle={styles.titleTableText}
                widthArr={[WIDTH * 0.32, WIDTH * 0.34, WIDTH * 0.34]}
              />
              <Row
                data={titleTable2}
                style={styles.titleTable}
                textStyle={styles.titleTableText}
                widthArr={[
                  WIDTH * 0.16,
                  WIDTH * 0.16,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
                ]}
              />
            </TableWrapper>
            {courses.map((item, index) => {
              return (
                <ListStudyTimes
                  key={index}
                  course={item}
                  index={index}
                  lengthList={courses.length}
                  onPressCourse={() => {
                    navigation.navigate("CourseStackScreen", {
                      course: item,
                      screen: "Course",
                      params: {
                        course: item,
                        subject: subject,
                      },
                    });
                  }}
                />
              );
            })}
          </>
        )}
        <Text style={styles.title}>
          Định mức sinh viên dự kiến khi mở lớp học phần:
        </Text>
        <View style={styles.content}>
          <Text style={styles.label}>Số SV tối thiểu: </Text>
          <Text style={styles.input}>{subject.soSVToiThieu}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.label}>Số SV tối đa: </Text>
          <Text style={styles.input}>{subject.soSVToiDa}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  title: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 15,
    color: "blue",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 20,
    width: 150,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    paddingRight: 170,
  },
  titleTable: {
    backgroundColor: "#d2d2d2",
  },
  titleTableText: {
    textAlign: "center",
  },
});
