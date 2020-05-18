import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, Button, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { changeAlias } from "./../../constants/common";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

export default Compose = ({ route }) => {
  const [customHeight, setCustomHeight] = useState(0);
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [chuDe, setChuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [listNguoiNhan, setListNguoiNhan] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [listThanhVienSchool, setListThanhVienSchool] = useState([]);

  useEffect(() => {
    if (route.params) {
      if (route.params.listNguoiNhan.length) {
        setListNguoiNhan(route.params.listNguoiNhan);
      }
    }
    axios
      .get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/listMember`)
      .then((res) => {
        setListThanhVienSchool(res.data);
      });
  }, []);
  const measureView = (event) => {
    setCustomHeight(event.nativeEvent.layout.height);
  };

  const handleNguoiNhan = (value) => {
    setNguoiNhan(value);
    let filterTemp = [];
    if (value.length > 1) {
      listThanhVienSchool.forEach((thanhVien) => {
        changeAlias(thanhVien.name).includes(changeAlias(value)) &&
          filterTemp.push(thanhVien);
      });
      setListFilter(filterTemp);
    }
  };

  return (
    <View>
      <View
        style={styles.containerHeadSent}
        onLayout={(event) => measureView(event)}
      >
        <ScrollView style={{ maxHeight: height * 0.2 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              display: listNguoiNhan === 0 ? "none" : "flex",
            }}
          >
            {listNguoiNhan.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: "#dfdfdf",
                    height: height * 0.05,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                    borderColor: "#dfdfdf",
                    borderWidth: 0.5,
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                  onPress={() => {
                    let listNguoiNhanTemp = _.differenceWith(
                      listNguoiNhan,
                      [item],
                      _.isEqual
                    );
                    setListNguoiNhan(listNguoiNhanTemp);
                  }}
                >
                  <Text> x {item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={{ flexDirection: "row", maxHeight: height * 0.05 }}>
          <Text style={{ fontSize: 20, marginRight: 10 }}>Tới</Text>
          <TextInput
            style={{
              fontSize: 20,
              paddingRight: 40,
              flexGrow: 1,
            }}
            multiline
            onChangeText={handleNguoiNhan}
            value={nguoiNhan}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          elevation: 999,
          zIndex: 999,
          top: customHeight,
          width: width,
        }}
      >
        <View
          style={{
            display: nguoiNhan.length > 1 ? "flex" : "none",
            borderBottomWidth: 0.5,
            borderColor: "grey",
            backgroundColor: "#FFF",
            width: width,
          }}
        >
          <ScrollView style={{ maxHeight: height * 0.4 }}>
            <View style={{ paddingHorizontal: 10 }}>
              {listFilter.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ height: 30 }}
                    onPress={() => {
                      if (_.findIndex(listNguoiNhan, item) < 0) {
                        setListNguoiNhan([...listNguoiNhan, item]);
                      } else {
                        let listNguoiNhanTemp = _.differenceWith(
                          listNguoiNhan,
                          [item],
                          _.isEqual
                        );
                        setListNguoiNhan(listNguoiNhanTemp);
                      }
                      setNguoiNhan("");
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "grey" }}>
                      {item.maSV} - {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.containerHeadSent}>
        <TextInput
          style={{
            fontSize: 17,
            paddingRight: 40,
            width: width,
            maxHeight: height * 0.2,
          }}
          multiline
          placeholder="Tiêu đề"
          onChangeText={setChuDe}
          value={chuDe}
        />
      </View>
      <View style={styles.containerBodySent}>
        <TextInput
          style={{
            fontSize: 17,
            paddingRight: 40,
            width: width,
            textAlignVertical: "top",
            minHeight: height * 0.7,
            maxHeight: height * 0.7,
          }}
          multiline
          placeholder="Nội dung"
          onChangeText={setNoiDung}
          value={noiDung}
        />
      </View>
      <TouchableOpacity
        onPress={() => console.log("haha")}
        opacity={0.2}
        style={{
          position: "absolute",
          marginRight: 10,
          padding: 7,
          top: -50,
          right: 0,
          elevation: 999,
          zIndex: 999,
        }}
      >
        <FontAwesome name="send" color="blue" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeadSent: {
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderBottomColor: "#777",
    padding: 10,
    minHeight: height * 0.1,
  },
  containerBodySent: {
    padding: 10,
    minHeight: height * 0.8,
  },
});
