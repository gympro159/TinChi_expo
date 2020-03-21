import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import CategoryListItem from "./../components/CategoryListItem";

export default Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Dụng cụ trượt tuyết" },
    { id: 2, name: "Quần áo trượt tuyết" },
    { id: 3, name: "Kính mũ" }
  ]);

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryListItem
          category={item}
          onPress={() => {
            navigation.navigate('Category', {       //truyền thông số categoryName vào Category
              categoryName: item.name
            });
          }}
        />
      )}
      keyExtractor={item => `${item.id}`}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16
  }
});
