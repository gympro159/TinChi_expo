import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CategoryListItem(props) {
  const { news, onPress } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}> {news.title} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    elevation: 10, //android
    zIndex: 999, //ios
    marginBottom: 16
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700"
  }
});
