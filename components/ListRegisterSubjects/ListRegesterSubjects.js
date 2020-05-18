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

export default ListRegisteredCourses = ({
  dataRowsBatBuoc,
  dataRowsTuChon,
  dataRowsNgoaiKhoa,
  ngoaiKhoa,
}) => {
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);

  return (dataRowsNgoaiKhoa.length === 0 && ngoaiKhoa) ||
    (dataRowsBatBuoc.length === 0 &&
      dataRowsTuChon.length === 0 &&
      !ngoaiKhoa) ? (
    <View style={{ alignItems: "center", justifyContent:"center", width: WIDTH, height: 50, backgroundColor: "#F9F9F9" }}>
      <Text>Hiện tại chưa tổ chức học phần!</Text>
    </View>
  ) : !ngoaiKhoa ? (
    <>
      <View style={styles.collapseContainer}>
        <Collapse
          isCollapsed={collapsed1}
          onToggle={(isCollapsed) => setCollapsed1(isCollapsed)}
        >
          <CollapseHeader style={styles.header}>
            <Text style={styles.headerText}>Các học phần bắt buộc</Text>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={dataRowsBatBuoc}
              renderItem={({ item }) => (
                <Table
                  borderStyle={{ borderColor: "#dbdbdb", borderWidth: 0.5 }}
                >
                  <Row
                    data={item}
                    textStyle={{ textAlign: "center" }}
                    widthArr={[
                      WIDTH * 0.22,
                      WIDTH * 0.46,
                      WIDTH * 0.16,
                      WIDTH * 0.16,
                    ]}
                  />
                </Table>
              )}
              keyExtractor={(item) => `${item[0]}`}
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
            <Text style={styles.headerText}>Các học phần tự chọn</Text>
          </CollapseHeader>
          <CollapseBody>
            <FlatList
              data={dataRowsTuChon}
              renderItem={({ item }) => (
                <Table
                  borderStyle={{ borderColor: "#dbdbdb", borderWidth: 0.5 }}
                >
                  <Row
                    data={item}
                    textStyle={{ textAlign: "center"}}
                    widthArr={[
                      WIDTH * 0.22,
                      WIDTH * 0.46,
                      WIDTH * 0.16,
                      WIDTH * 0.16,
                    ]}
                  />
                </Table>
              )}
              keyExtractor={(item) => `${item[0]}`}
            />
          </CollapseBody>
        </Collapse>
      </View>
    </>
  ) : (
    <FlatList
      data={dataRowsNgoaiKhoa}
      renderItem={({ item, index }) => (
        <Table borderStyle={{ borderColor: "#dbdbdb", borderWidth: 0.5 }}>
          <Row
            data={item}
            textStyle={{ textAlign: "center"}}
            widthArr={[WIDTH * 0.22, WIDTH * 0.46, WIDTH * 0.16, WIDTH * 0.16]}
          />
        </Table>
      )}
      keyExtractor={(item) => `${item[0]}`}
    />
  );
};

const styles = StyleSheet.create({
  collapseContainer: {},
  header: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  headerText: {
    fontSize: 15,
  },
});
