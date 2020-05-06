import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
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
} from "react-native-table-component";

const WIDTH = Dimensions.get("window").width;

export default ListSemester = ({ semesterContent, index, lengthList, onPressCourse, onPressSubject }) => {

  const subjectCell = (maHP, index) => {
    return (
      <TouchableOpacity onPress={() => onPressSubject(index)}>
        <Text style={{ color: "#337ab7" }}>{maHP}</Text>
      </TouchableOpacity>
    );
  };
  const courseCell = (LopHP, index) => {
    return (
      <TouchableOpacity onPress={() => onPressCourse(index)}>
        <Text style={{ color: "#337ab7" }}>{LopHP}</Text>
      </TouchableOpacity>
    );
  };

  const semesterCourseContent = () => {
    var result = [];
    semesterContent.course.map((item, index) => {
      let rowContent = [
        subjectCell(item.maHP, index),
        courseCell(item.lopHP, index),
        `${item.diemThi}`,
        `${item.tongDiem}`
      ];
      result.push(rowContent);
    });
    return result;
  };
  const [collapsed, setCollapsed] = useState((index===lengthList-1)?true:false);
  const [dataRows, setDataRows] = useState(semesterCourseContent)

  return (
    <View style={styles.collapseContainer}>
      <Collapse
        isCollapsed={collapsed}
        onToggle={(isCollapsed) => setCollapsed(isCollapsed)}
      >
        <CollapseHeader style={styles.header}>
          <Text style={styles.headerText}>
            Học kỳ: {semesterContent.semester} - Năm học: {semesterContent.year}
          </Text>
        </CollapseHeader>
        <CollapseBody>
          <Table borderStyle={{ borderColor: "#777", borderWidth: 1 }}>
            <Rows
              data={dataRows}
              textStyle={{textAlign: "center"}}
              widthArr={[WIDTH * 0.22, WIDTH * 0.52, WIDTH * 0.13, WIDTH * 0.13]}
            />
          </Table>
        </CollapseBody>
      </Collapse>
    </View>
  );
};

const styles = StyleSheet.create({
  collapseContainer: {},
  header: {
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
  },
  headerText: {
    fontSize: 15,
  },
});
