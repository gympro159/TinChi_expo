import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ListNews = (props) => {
  const { news, index ,onPress } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={(index>0)?styles.container:{paddingTop: 20}}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="hand-pointing-right"
            size={20}
            color="#3076F1"
          ></MaterialCommunityIcons>
          <Text style={styles.titleContent}> {news.title}</Text>
        </View>
        <View>
          <Text style={styles.date}>[{news.date}]</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#dbdbdb",
    borderTopWidth: 0.5,
    paddingTop: 20
  },
  titleContainer: {
    // elevation: 10, //android
    // zIndex: 999, //ios
    //marginBottom: 16,
    flex: 1,
    flexDirection: "row",
    paddingRight: 15
  },
  titleContent: {
    // textTransform: "uppercase",
    //marginBottom: 8,
    fontWeight: "700",
    color: "#3076F1"
  },
  date: {
    fontSize: 13,
    paddingBottom: 10,
    marginLeft: 20,
    color: "#777777"
  }
});
