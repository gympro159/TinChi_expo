import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Picker,
  Modal,
} from "react-native";
import { Button, Text } from "react-native-elements";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import axios from "axios";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const HistoryTuition = () => {
  const [listHistoryTuition, setListHistoryTuition] = useState([]);
  const [modalContent, setModalContent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/historyTuition`)
      .then((res) => {
        setListHistoryTuition(res.data);
      });
  }, []);

  const openModalButton = (historyTuition) => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setModalContent(historyTuition);
            setModalVisible(true);
          }}
        >
          <FontAwesome name="list-ul" size={17} color="blue" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                width: WIDTH * 0.9,
                alignItems: "center",
                paddingHorizontal: 10,
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#004275",
                  marginHorizontal: 10,
                }}
              >
                BIÊN LAI
              </Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ fontSize: 25, color: "#777" }}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 5 }}>
              <View style={styles.content}>
                <Text style={styles.label}>Số biên lai: </Text>
                <Text style={styles.input}>{modalContent.soBienLai}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Ký hiệu: </Text>
                <Text style={styles.input}>{modalContent.kyHieu}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Họ và tên: </Text>
                <Text style={styles.input}>{modalContent.hoTen}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Mã SV: </Text>
                <Text style={styles.input}>{modalContent.maSV}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Ngày lập biên lai: </Text>
                <Text style={styles.input}>{modalContent.ngayLap}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Học kỳ: </Text>
                <Text style={styles.input}>{modalContent.hocKy}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Nội dung: </Text>
                <Text style={styles.input}>{modalContent.noiDung}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Số tiền: </Text>
                <Text style={styles.input}>{modalContent.soTien}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Hình thức thu: </Text>
                <Text style={styles.input}>{modalContent.hinhThucThu}</Text>
              </View>
              <Table
                borderStyle={{ borderColor: "#dbdbdb", borderWidth: 1 }}
                style={{ paddingRight: 3 }}
              >
                <Row
                  data={["STT", "Tên lớp học phần", "Số tiền"]}
                  style={{ backgroundColor: "#d2d2d2" }}
                  textStyle={{ textAlign: "center" }}
                  widthArr={[32, undefined, 75]}
                />
                {modalContent.danhSach && modalContent.danhSach.map((item, index) => {
                  return (
                    <Row
                      key={index}
                      data={[`${item.STT}`, `${item.tenLHP}`, `${item.soTien}`]}
                      style={
                        index % 2
                          ? { backgroundColor: "#f9f9f9" }
                          : { backgroundColor: "#fff" }
                      }
                      textStyle={{ textAlign: "center" }}
                      widthArr={[32, undefined, 75]}
                    />
                  );
                })}
              </Table>
            </ScrollView>
            <View
              style={{
                width: WIDTH * 0.9,
                paddingTop: 10,
                marginTop: 10,
                alignItems: "flex-end",
                paddingHorizontal: 15,
                marginBottom: 10,
                borderTopWidth: 0.5,
              }}
            >
              <Button
                title="Đóng"
                buttonStyle={{
                  backgroundColor: "#6c757d",
                  borderRadius: 6,
                  height: 30,
                  width: 55,
                }}
                titleStyle={{ color: "#fff", fontSize: 14 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          borderBottomWidth: 0.5,
          width: WIDTH,
          marginVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          BIÊN LAI NỘP HỌC PHÍ
        </Text>
      </View>
      <Table
        borderStyle={{
          borderColor: "#dbdbdb",
          borderWidth: 1,
        }}
      >
        <Row
          data={["Năm học/học kỳ", "Thời điểm lập", "Số tiền", ""]}
          style={styles.titleTable}
          textStyle={styles.tableText}
          widthArr={[WIDTH * 0.35, WIDTH * 0.3, WIDTH * 0.26, WIDTH * 0.09]}
        />
      </Table>
      <ScrollView style={{}}>
        <Table
          borderStyle={{
            borderColor: "#dbdbdb",
            borderWidth: 1,
          }}
        >
          {listHistoryTuition.map((historyTuition, index) => {
            return (
              <Row
                key={index}
                data={[
                  `${historyTuition.hocKy}`,
                  `${historyTuition.ngayLap}`,
                  `${historyTuition.soTien}`,
                  openModalButton(historyTuition),
                ]}
                style={index % 2 ? styles.contentTable2 : styles.contentTable}
                textStyle={styles.tableText}
                widthArr={[
                  WIDTH * 0.35,
                  WIDTH * 0.3,
                  WIDTH * 0.26,
                  WIDTH * 0.09,
                ]}
              />
            );
          })}
        </Table>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 7,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Tổng học phí đã nộp:</Text>
          <Text style={{ fontWeight: "bold" }}>4,770,000 đồng</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const Stack = createStackNavigator();

export default HistoryTuitionStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryTuition"
        component={HistoryTuition}
        options={{
          headerTitleAlign: "center",
          title: "Lịch sử nộp học phí",
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
  },
  titleTable: {
    backgroundColor: "#d2d2d2",
    height: 40,
  },
  contentTable: {
    backgroundColor: "#F9F9F9",
    minHeight: 40,
  },
  contentTable2: {
    backgroundColor: "#fff",
    minHeight: 40,
  },
  tableText: {
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.9,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 6,
    paddingTop: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeModalButton: {},
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#dbdbdb",
    width: WIDTH * 0.9,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
    width: 150,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    paddingRight: 180,
  },
});
