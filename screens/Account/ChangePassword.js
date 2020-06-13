import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { connect } from "react-redux";
import Loader from "react-native-modal-loader";
import md5 from "md5";
import { AuthContext } from "./../../AppNavigator";
import { actChangePasswordStudentRequest } from "./../../actions/index";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ChangePassword = ({ dataToken, password, changePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [confirm, setConfirm] = useState(-2);
  const { signOut } = useContext(AuthContext);

  const handleChangePassword = () => {
    Alert.alert(
      "Xác nhận",
      "Xác nhận đổi mật khẩu?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            if (!oldPassword || !newPassword || !newPassword2) {
              Alert.alert(
                "Thông báo",
                "Vui lòng điền đầy đủ thông tin!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else if (newPassword !== newPassword2) {
              Alert.alert(
                "Thông báo",
                "Mật khẩu mới không khớp!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else if (oldPassword === newPassword) {
              Alert.alert(
                "Thông báo",
                "Mật khẩu mới không được trùng với mật khẩu cũ!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else if (md5(oldPassword) !== password) {
              Alert.alert(
                "Thông báo",
                "Mật khẩu cũ đúng!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            } else {
              var dataBody = {
                OldPassword: md5(oldPassword),
                NewPassword: md5(newPassword),
              };
              setConfirm(0);
              changePassword(dataToken, dataBody, setConfirm);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{ borderBottomWidth: 0.5, width: WIDTH, marginVertical: 10 }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          THAY ĐỔI MẬT KHẨU
        </Text>
      </View>

      <View style={styles.changePasswordContainer}>
        <Input
          onChangeText={setOldPassword}
          value={oldPassword}
          style={styles.textInput}
          placeholder="Mật khẩu cũ"
          secureTextEntry
        />
        <Input
          onChangeText={setNewPassword}
          value={newPassword}
          style={styles.textInput}
          placeholder="Mật khẩu mới"
          secureTextEntry
        />
        <Input
          onChangeText={setNewPassword2}
          value={newPassword2}
          style={styles.textInput}
          placeholder="Xác nhận lại mật khẩu"
          secureTextEntry
        />
        <Button
          title="Đổi mật khẩu"
          buttonStyle={styles.buttonSubmit}
          onPress={handleChangePassword}
        />
      </View>
      <ScrollView style={{ marginLeft: 10, flexGrow: 1, height: HEIGHT - 380 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Lưu ý:</Text>
          {"\n"}- Mật khẩu được sử dụng để đăng nhập vào hệ thống và có vai trò
          rất quan trọng. Hãy giữ gìn mật khẩu cẩn thận và tuyệt đối không được
          giao mật khẩu cho người khác.
          {"\n"}- Sinh viên phải chịu hoàn toàn trách nhiệm nếu để lộ mật khẩu
          dẫn đến ảnh hưởng đến thông tin và dữ liệu của cá nhân cũng như công
          việc của bản thân.
          {"\n"}- Nên đặt mật khẩu đủ dài và khó đoán. Không nên sử dụng ngày
          sinh, số điện thoại, cách viết tắt của họ tên,.... để làm mật khẩu.
          {"\n"}- Để tránh các sai sót khi gõ mật khẩu, nên tắt chế độ gõ tiếng
          Việt trước khi thay đổi mật khẩu.
        </Text>
      </ScrollView>
      {confirm === 0 ? (
        <Loader loading={true} color="#000" />
      ) : confirm === 1 ? (
        Alert.alert(
          "Thông báo",
          "Đổi mật khẩu thành công!",
          [
            {
              text: "OK",
              onPress: () => {
                setConfirm(-2);
                signOut();
              },
              style: "cancel",
            },
          ],
          { cancelable: false }
        )
      ) : (
        confirm === -1 &&
        Alert.alert(
          "Thông báo",
          "Đổi mật khẩu không thành công!",
          [
            {
              text: "Cancel",
              onPress: () => setConfirm(-2),
              style: "cancel",
            },
          ],
          { cancelable: false }
        )
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    dataToken: state.dataToken,
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changePassword: (dataToken, dataBody, confirm) => {
      dispatch(actChangePasswordStudentRequest(dataToken, dataBody, confirm));
    },
  };
};

const ChangePasswordConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

const Stack = createStackNavigator();

export default ChangePasswordStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordConnect}
        options={{
          headerTitleAlign: "center",
          title: "Đổi mật khẩu",
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  changePasswordContainer: {
    height: 250,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    zIndex: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textInput: {
    width: WIDTH * 0.9,
    height: 90,
    marginBottom: 20,
    color: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#000",
  },
  buttonSubmit: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: 130,
  },
});
