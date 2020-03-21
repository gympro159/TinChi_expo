import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Profile from "./../assets/profile.png";

export default function CategoryListItem(props) {
  const { category, onPress } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}> {category.name} </Text>
        <Image style={styles.categoryItem} source={Profile} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    //borderRadius: 4,
    backgroundColor: "#FFF",
    //shadowColor: '#000',
    //shadowOpacity: 0.3,
    //shadowRadius: 10,
    elevation: 10, //android
    zIndex: 999, //ios
    //shadowOffset: { width: 0, height: 0 },
    marginBottom: 16
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700"
  },
  categoryItem: {
    width: 64,
    height: 64
  }
});
