import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
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

export default ListRegisteredCourses = ({ listRender, onPressCourse }) => {
  const [collapsed1, setCollapsed1] = useState(false);
  const [collapsed2, setCollapsed2] = useState(true);
  const [dataRowsDuyet, setDataRowsDuyet] = useState([]);
  const [dataRowsChuaDuyet, setDataChuaDuyetRows] = useState([]);

  useEffect(() => {
    let dataRowsDuyetTemp = [],
      dataRowsChuaDuyetTemp = [];
    listRender.duocDuyet.forEach((course) => {
      let row = [
        `${course.soTC}`,
        `${course.tenLHP}`,
        `${course.thoiKhoaBieu}\n${course.ngayBatDau}`,
        `${course.giangVien}`,
      ];
      dataRowsDuyetTemp.push(row);
    });
    listRender.dangChoDuyet.forEach((course) => {
      let row = [
        `${course.soTC}`,
        `${course.tenLHP}`,
        `${course.thoiKhoaBieu}\n${course.ngayBatDau}`,
        `${course.giangVien}`,
      ];
      dataRowsChuaDuyetTemp.push(row);
    });
    setDataRowsDuyet(dataRowsDuyetTemp);
    setDataChuaDuyetRows(dataRowsChuaDuyetTemp);
  }, []);

  return (
    <>
      <View style={styles.collapseContainer}>
        <Collapse
          isCollapsed={collapsed1}
          onToggle={(isCollapsed) => setCollapsed1(isCollapsed)}
        >
          <CollapseHeader style={styles.header}>
            <Text style={styles.headerText}>Lớp học phần đã được duyệt</Text>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={dataRowsDuyet}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onPressCourse(item)}>
                  <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 0.5 }}>
                    <Row
                      data={item}
                      textStyle={{ textAlign: "center", color: "#337ab7" }}
                      widthArr={[
                        WIDTH * 0.12,
                        WIDTH * 0.3,
                        WIDTH * 0.33,
                        WIDTH * 0.25,
                      ]}
                    />
                  </Table>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => `${item[2]}`}
            />
          </CollapseBody>
        </Collapse>
      </View>
      <View style={styles.collapseContainer}>
        <Collapse
          isCollapsed={collapsed2}
          onToggle={(isCollapsed) => setCollapsed2(isCollapsed)}
        >
          <CollapseHeader style={styles.header}>
            <Text style={styles.headerText}>Lớp học phần đang chờ duyệt</Text>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={dataRowsChuaDuyet}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onPressCourse(item)}>
                  <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 0.5 }}>
                    <Row
                      data={item}
                      textStyle={{ textAlign: "center", color: "#337ab7" }}
                      widthArr={[
                        WIDTH * 0.12,
                        WIDTH * 0.3,
                        WIDTH * 0.33,
                        WIDTH * 0.25,
                      ]}
                    />
                  </Table>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => `${item[2]}`}
            />
          </CollapseBody>
        </Collapse>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  collapseContainer: {},
  header: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb"
  },
  headerText: {
    fontSize: 15,
  },
});
