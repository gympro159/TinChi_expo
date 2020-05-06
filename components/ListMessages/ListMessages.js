import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CheckBox } from "react-native-elements";

export default ListMessages = props => {
  const { message, checkList, index, onPress, onChecked } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={index > 0 ? styles.container : { paddingTop: 20, paddingBottom: 5 }}>
        <View style={styles.titleContainer}>
          <CheckBox
            checked={checkList[index]}
            onPress={onChecked}
          />
          <View style={styles.titleContent}>
            <Text style={!message.seen ? { fontWeight: "bold" } : {}}>
              {message.sender.name}
            </Text>
            <Text
              style={
                !message.seen
                  ? { color: "#337ab7", fontWeight: "bold" }
                  : { color: "#337ab7" }
              }
            >
              {message.title}
            </Text>
            <Text style={!message.seen ? { fontWeight: "bold" } : {}}>
              [{message.whenSend}]
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#000",
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 5
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row"
  },
  titleContent: {
    paddingRight: 60,
    paddingTop: 0
  }
});
