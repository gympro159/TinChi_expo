import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
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

const WIDTH = Dimensions.get("window").width;

const Conduct = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <View
        style={{ borderBottomWidth: 0.5, width: WIDTH, marginVertical: 10 }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#3076F1",
            marginHorizontal: 10,
          }}
        >
          Kết quả đánh giá rèn luyện
        </Text>
      </View>
      <FlatList
        data={listConduct}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 16,
              backgroundColor: "#fff",
              margin: 5,
              zIndex: 5,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <View style={{ width: WIDTH * 0.7 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Học kỳ {item.hocKy} - {item.namHoc}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Giáo viên CVHT/CN: {item.giaoVien}
              </Text>
              <Text style={{ fontSize: 14, color: "#808080" }}>
                Điểm rèn luyện: {item.dỉemRL}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#D3E3F2",
                height: 40,
                width: 80,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#3076F1",
                }}
              >
                {item.xl}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => `${item.hocKy}-${item.namHoc}`}
      />
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
    backgroundColor: "#d2d2d2",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
});
