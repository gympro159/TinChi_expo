import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
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

const WIDTH = Dimensions.get("window").width;

const Conduct = ({ navigation }) => {
  const tableTitle = [
    "Học kỳ, Năm học",
    "Lớp sinh hoạt",
    "Giáo viên CVHT/CN",
    "Điểm RL",
    "Xếp loại",
  ];

  const [listConduct, setListConduct] = useState([
    {
      namHoc: "2016-2017",
      hocKy: 1,
      lopSinhHoat: "Công nghệ thông tin K40B",
      giaoVien: "Võ Việt Dũng",
      dỉemRL: "70",
      xl: "Khá",
    },
    {
      namHoc: "2016-2017",
      hocKy: 2,
      lopSinhHoat: "Công nghệ thông tin K40B",
      giaoVien: "Nguyễn Thị Bích Lộc",
      dỉemRL: "70",
      xl: "Khá",
    },
    {
      namHoc: "2017-2018",
      hocKy: 1,
      lopSinhHoat: "Công nghệ thông tin K40B",
      giaoVien: "Nguyễn Thị Bích Lộc",
      dỉemRL: "72",
      xl: "Khá",
    },
    {
      namHoc: "2017-2018",
      hocKy: 2,
      lopSinhHoat: "Công nghệ thông tin K40B",
      giaoVien: "Nguyễn Thị Bích Lộc",
      dỉemRL: "81",
      xl: "Tốt",
    },
  ]);

  const handleListConduct = () => {
    var result = [];
    listConduct.forEach((ASemester) => {
      let row = [
        `Học kỳ ${ASemester.hocKy}, năm học ${ASemester.namHoc}`,
        `${ASemester.lopSinhHoat}`,
        `${ASemester.giaoVien}`,
        `${ASemester.dỉemRL}`,
        `${ASemester.xl}`,
      ];
      result.push(row);
    });
    return result;
  };

  const [tableContent, setTableContent] = useState(() => handleListConduct())
  //const tableContent = () => handleListConduct();

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: "grey", borderWidth: 2 }}>
        <Row
          data={tableTitle}
          style={styles.head}
          textStyle={styles.text}
          widthArr={[
            WIDTH * 0.23,
            WIDTH * 0.29,
            WIDTH * 0.2,
            WIDTH * 0.15,
            WIDTH * 0.13
          ]}
        />
      </Table>
      <ScrollView>
        <Table borderStyle={{ borderColor: "grey", borderWidth: 2 }}>
          <Rows
            data={tableContent}
            textStyle={styles.text}
            widthArr={[
              WIDTH * 0.23,
              WIDTH * 0.29,
              WIDTH * 0.2,
              WIDTH * 0.15,
              WIDTH * 0.13,
            ]}
          />
        </Table>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default ConductStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conduct"
        component={Conduct}
        options={{
          headerTitleAlign: "center",
          title: "Kết quả rèn luyện",
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
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
});
