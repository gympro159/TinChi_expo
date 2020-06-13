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
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { changeAlias } from "./../../constants/common";
import _ from "lodash";
import { actFetchListTeachersRequest } from "./../../actions/index";

const { width, height } = Dimensions.get("window");

const Compose = ({ route, dataToken, listTeachers, fetchListTeachers }) => {
  const [loading, setLoading] = useState(true);
  const [customHeight, setCustomHeight] = useState(0);
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [chuDe, setChuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [listNguoiNhan, setListNguoiNhan] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [listThanhVienSchool, setListThanhVienSchool] = useState([]);
  const [listFilterPagination, setListFilterPagination] = useState([]);
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState(0);
  const pageSize = 18;

  useEffect(() => {
    if (route.params) {
      if (route.params.listNguoiNhan.length) {
        setListNguoiNhan(route.params.listNguoiNhan);
      }
    }

    axios
      .get(`https://5ebb82caf2cfeb001697cd36.mockapi.io/school/listMember`)
      .then((res) => {
        if (Object.keys(dataToken).length && !check) {
          setCheck(1);
          if (listTeachers.length === 0) fetchListTeachers(dataToken);
        }

        if (listTeachers.length) {
          let listThanhVienSchoolTemp = [...listTeachers, ...res.data];
          setListThanhVienSchool(listThanhVienSchoolTemp);
          setLoading(false);
        }
      });
  }, [listTeachers]);

  const measureView = (event) => {
    setCustomHeight(event.nativeEvent.layout.height);
  };

  const handleNguoiNhan = (value) => {
    setPage(0);
    setNguoiNhan(value);
    let filterTemp = [];
    if (value.length > 1) {
      listThanhVienSchool.forEach((thanhVien) => {
        (thanhVien.name
          ? changeAlias(thanhVien.name).includes(changeAlias(value))
          : changeAlias(thanhVien.FullName).includes(changeAlias(value))) &&
          filterTemp.push(thanhVien);
      });
      setListFilter(filterTemp);
      setListFilterPagination([...filterTemp].slice(0, pageSize));
    }
  };

  const handleLoadMore = () => {
    var listFilterPaginationTemp = [
      ...listFilterPagination,
      ...listFilter.slice(page + 10, page + 10 + pageSize),
    ];
    setListFilterPagination(listFilterPaginationTemp);
    setPage(page + 10);
  };

  return loading ? (
    <Spinner
      visible={loading}
      textContent={"Đang tải..."}
      textStyle={{ color: "#fff" }}
    />
  ) : (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView>
        <View
          style={styles.containerHeadSent}
          onLayout={(event) => measureView(event)}
        >
          <ScrollView style={{ maxHeight: height * 0.2 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                display: listNguoiNhan.length === 0 ? "none" : "flex",
              }}
            >
              {listNguoiNhan.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "#D3E3F2",
                      height: height * 0.05,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                      paddingHorizontal: 5,
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
                    <Text>{item.name || item.FullName} </Text>
                    <FontAwesome name="close" size={14} color="#777" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
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
              maxHeight: height * 0.4,
            }}
          >
            <FlatList
              data={listFilterPagination}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 10 }}>
                  <TouchableOpacity
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
                      {item.maSV || item.UserName} -{" "}
                      {item.name || item.FullName}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={styles.containerHeadSent}>
          <TextInput
            style={{
              fontSize: 17,
              paddingRight: 40,
              width: width,
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
              minHeight: height * 0.3,
              marginBottom: 50,
            }}
            multiline
            placeholder="Nội dung"
            onChangeText={setNoiDung}
            value={noiDung}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => console.log("haha")}
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          bottom: 10,
          right: 10,
          backgroundColor: "#3076F1",
          borderRadius: 30,
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
        <FontAwesome name="send" color="#fff" size={30} />
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
  },
});

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    listTeachers: state.listTeachers,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListTeachers: (dataToken) => {
      dispatch(actFetchListTeachersRequest(dataToken));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
