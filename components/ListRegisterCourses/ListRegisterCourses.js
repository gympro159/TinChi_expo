import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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

export default ListRegisterCourses = ({
  course,
  subject,
  onPressCourse,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const mountSVRegister = (dk, tt ,td)=> {
      return(
        <Text style={{ textAlign: "center", color: "#337ab7", fontSize: 13 }}>
        <Text style={{ fontWeight: "bold" }}>{dk}</Text>/
        {tt}/{td}
      </Text>
      )
  }

  const [dataRow, setDataRow] = useState([
    `${course.giangVien}`,
    `${course.thoiKhoaBieu}`,
    `${course.ngayHetHanDK}`,
    mountSVRegister(course.svDaDangKy, subject.soSVToiThieu, subject.soSVToiDa)
  ]);

  return (
    <View style={styles.collapseContainer}>
      <Collapse
        isCollapsed={collapsed}
        onToggle={(isCollapsed) => setCollapsed(isCollapsed)}
      >
        <CollapseHeader style={styles.header}>
          <Text style={styles.headerText}>
            <Text style={{ fontWeight: "bold" }}>{course.tenLHP}</Text>
            {"\n"}
            {course.maLHP}
          </Text>
        </CollapseHeader>
        <CollapseBody>
          <TouchableOpacity onPress={() => onPressCourse()}>
            <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}>
              <Row
                data={dataRow}
                textStyle={{ textAlign: "center", color: "#337ab7", fontSize: 13 }}
                widthArr={[
                  WIDTH * 0.3,
                  WIDTH * 0.22,
                  WIDTH * 0.23,
                  WIDTH * 0.25,
                ]}
              />
            </Table>
          </TouchableOpacity>
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
    marginLeft: 4
  },
});
