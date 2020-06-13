import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CheckBox } from "react-native-elements";
import _ from "lodash";
import { getLocalDateFormat2 } from "./../../constants/common";

export default ListMessages = (props) => {
  const { message, checkList, index, onPress, onChecked } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={
          index + 1 < checkList.length
            ? styles.container
            : { paddingTop: 20, paddingBottom: 5, marginBottom: 50 }
        }
      >
        <View style={styles.titleContainer}>
          <CheckBox checked={checkList[index]} onPress={onChecked} />
          <View style={styles.titleContent}>
            <Text
              numberOfLines={1}
              style={
                !message.thoiGianNhan && message.loaiTin === 1
                  ? { fontWeight: "bold", fontSize: 17 }
                  : { fontSize: 17 }
              }
            >
              {message.nguoiGui.name}
            </Text>
            <Text
              numberOfLines={1}
              style={
                !message.thoiGianNhan && message.loaiTin === 1
                  ? { fontWeight: "bold" }
                  : {}
              }
            >
              {_.split(message.thoiGianGui, " ")[0] === getLocalDateFormat2()
                ? _.split(message.thoiGianGui, " ")[1]
                : _.split(message.thoiGianGui, " ")[0]}
            </Text>
            <Text
              numberOfLines={1}
              style={
                !message.thoiGianNhan && message.loaiTin === 1
                  ? { color: "#3076F1", fontWeight: "bold" }
                  : { color: "#3076F1" }
              }
            >
              {message.title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomColor: "#dbdbdb",
    // borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 5,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titleContent: {
    marginRight: 20,
    paddingRight: 60,
    paddingTop: 0,
  },
});
