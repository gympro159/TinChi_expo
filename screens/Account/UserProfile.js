import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const UserProfile = ({ navigation, studentProfile }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#004275" }}>
        LÝ LỊCH CÁ NHÂN
      </Text>
      <Button
        title="Thay đổi lý lịch"
        onPress={() => navigation.push("EditProfile")}
      />
      <ScrollView>
        <Text style={styles.title}>Thông tin chung:</Text>
        <View style={styles.content}>
          <Text style={styles.label}>Mã sinh viên: </Text>
          <Text style={styles.input}>{studentProfile.MaSinhVien}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Họ và tên: </Text>
          <Text style={styles.input}>{studentProfile.HoVaTen}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Giới tính: </Text>
          <Text style={styles.input}>{studentProfile.GioiTinh?"Nam":"Nữ"}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Ngày sinh: </Text>
          <Text style={styles.input}>{studentProfile.NgaySinh}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Nơi sinh: </Text>
          <Text style={styles.input}>{studentProfile.NoiSinh}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Quốc tịch: </Text>
          <Text style={styles.input}>{studentProfile.QuocTich}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Dân tộc: </Text>
          <Text style={styles.input}>{studentProfile.DanToc}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Tôn giáo: </Text>
          <Text style={styles.input}>{studentProfile.TonGiao}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Số CMND: </Text>
          <Text style={styles.input}>{studentProfile.SoCMND}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Ngày cấp: </Text>
          <Text style={styles.input}>{studentProfile.NgayCapCMND}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.label}>Nơi cấp: </Text>
          <Text style={styles.input}>{studentProfile.NoiCapCMND}</Text>
        </View>
        <Text style={styles.title}>
          Thông tin liên hệ, địa chỉ cư trú hiện tại:
        </Text>
        <View style={styles.content}>
          <Text style={styles.label}>Điện thoại: </Text>
          <Text style={styles.input}>{studentProfile.DienThoai}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Di động: </Text>
          <Text style={styles.input}>{studentProfile.DiDong}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.input}>{studentProfile.Email}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Hình thức cư trú: </Text>
          <Text style={styles.input}>{studentProfile.CuTru_HinhThuc}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Ngày bắt đầu cư trú: </Text>
          <Text style={styles.input}>{studentProfile.CuTru_NgayBatDau}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.label}>Địa chỉ cư trú: </Text>
          <Text style={styles.input}>{studentProfile.CuTru_DiaChi}</Text>
        </View>
        <Text style={styles.title}>
          Thông tin về quê quán, hộ khẩu thường trú:
        </Text>
        <View style={styles.content}>
          <Text style={styles.label}>Quê quán: </Text>
          <Text style={styles.input}>{studentProfile.QueQuan_ThongTin}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.label}>Hộ khẩu thường trú: </Text>
          <Text style={styles.input}>{studentProfile.TTru_DiaChi}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const EditProfile = () => {
  return (
    <View>
      <Text>Edit Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    borderBottomColor: "#777",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  title: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 15,
    color: "blue",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 20,
    width: 150,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    paddingRight: 170,
  },
});

const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
  };
};

const UserProfileConnect = connect(
  mapStateToProps,
  null
)(UserProfile);

const Stack = createStackNavigator();

export default UserProfileStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileConnect}
        options={{
          headerTitleAlign: "center",
          title: "Lý lịch cá nhân",
          headerLeft: () => (
            <FontAwesome
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
              name="bars"
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerTitleAlign: "center", title: "Thay đổi lý lịch" }}
      />
    </Stack.Navigator>
  );
};
