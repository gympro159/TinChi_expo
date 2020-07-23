import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

export default ListRegisteredCourses = ({
  subject,
  onPress,
  stt,
  check,
}) => {
  return (
    <View
      style={{
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
      <View
        style={{
          width: WIDTH * 0.9,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            backgroundColor: "#D3E3F2",
            height: 40,
            width: 40,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 6,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#3076F1",
            }}
          >
            {stt}
          </Text>
        </View>
        <View style={{ width: WIDTH * 0.7 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {subject.TenHocPhan}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            {subject.MaHocPhan}{" "}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Loại học phần:{" "}
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              {!subject.HocPhanBatBuoc ? "Tự chọn" : "Bắt buộc"}
            </Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Số tín chỉ: {subject.SoTinChi}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Số lớp học phần:{" "}
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              {subject.SoLopHocPhan}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          width: WIDTH * 0.9,
          flexDirection: "row",
          justifyContent: !check ? "flex-end" : "space-between",
          // justifyContent: "flex-end",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {check && (
          <View>
            <Text style={{ color: "#43BC0A", fontSize: 15 }}>
              Đã đăng ký <FontAwesome name="check" size={15} color="#43BC0A" />
            </Text>
          </View>
        )}
        {subject.SoLopHocPhan > 0 && (
          <TouchableOpacity onPress={onPress}>
            <Text style={{ color: "#3076F1" }}>
              Danh sách lớp{" "}
              <FontAwesome name="chevron-right" size={15} color="#3076F1" />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapseContainer: {},
  header: {
    backgroundColor: "#eaf1fe",
    height: 30,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 15,
  },
});
