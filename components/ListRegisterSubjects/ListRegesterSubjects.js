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

export default ListRegisteredCourses = ({ subject, onPress, stt }) => {
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
            {subject.tenHP}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            {subject.maHP}{" "}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Loại học phần:{" "}
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              {subject.tuChon ? "Tự chọn" : "Bắt buộc"}
            </Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Số tín chỉ: {subject.soTinChi}
          </Text>
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Số lớp mở đăng ký:{" "}
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              {subject.soLop}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          width: WIDTH * 0.9,
          flexDirection: "row",
          justifyContent: !subject.daDK ? "flex-end" : "space-between",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {subject.daDK && (
          <View>
            <Text style={{ color: "#43BC0A", fontSize: 15 }}>
              Đã đăng ký <FontAwesome name="check" size={15} color="#43BC0A" />
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: "#3076F1" }}>
            Danh sách lớp{" "}
            <FontAwesome name="chevron-right" size={15} color="#3076F1" />
          </Text>
        </TouchableOpacity>
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
