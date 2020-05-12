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

export default ListStudyTimes = ({
  course,
  index,
  lengthList,
  onPressCourse,
}) => {

  const [collapsed, setCollapsed] = useState(
    index === lengthList - 1 ? true : false
  );
  const [dataRows, setDataRows] = useState([
    `${course.lanHoc}`,
    `${course.diemQTHT.toFixed(1)}`,
    `${course.diemThi1===null?"":course.diemThi1.toFixed(1)}`,
    `${course.tongDiem1===null?"":course.tongDiem1.toFixed(1)}`,
    `${course.diemThi2===null?"":course.diemThi2.toFixed(1)}`,
    `${course.tongDiem2===null?"":course.tongDiem2.toFixed(1)}`,
  ]);

  return (
    <View style={styles.collapseContainer}>
      <Collapse
        isCollapsed={collapsed}
        onToggle={(isCollapsed) => setCollapsed(isCollapsed)}
      >
        <CollapseHeader style={styles.header}>
          <Text style={styles.headerText}>{course.tenLHP}</Text>
        </CollapseHeader>
        <CollapseBody>
          <TouchableOpacity onPress={() => onPressCourse()}>
            <Table borderStyle={{ borderColor: "#777", borderWidth: 1 }}>
              <Row
                data={dataRows}
                textStyle={{ textAlign: "center", color: "#337ab7" }}
                widthArr={[
                  WIDTH * 0.16,
                  WIDTH * 0.16,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
                  WIDTH * 0.17,
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
  },
});
