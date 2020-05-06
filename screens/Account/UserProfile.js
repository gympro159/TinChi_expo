import React, {useState} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const UserProfile = ({ navigation }) => {
  const [student] = useState({
    msv: "16T1021102",
    fullName: "Lê Ngọc Nghĩa",
    sex: "Nam",
    dob: "26/04/1998",
    pob: "Quảng Trị",
    nationality: "Việt Nam",
    nation: "Kinh",
    religion: "Phật giáo",
    idNumber: "197351481",
    dateRange: "30/07/2013",
    issuedBy: "Thị xã Quảng Trị - tỉnh Quảng Trị",
    phone: "0935003282",
    mobile: "0935003282",
    email: "ngocnghiale1998@gmail.com",
    residenceForm: "Ở ngoại trú",
    dateOfResidence: "05/09/2016",
    residentialAddress: "Kiệt 100- Đặng Huy Trứ, phường Trường An, thành phố Huế",
    homeTown: "Làng Hưng Nhơn, Hải Hòa, Hải Lăng, Quảng Trị",
    permanentResidence: "44 Lê Duẩn, thị xã Quảng Trị, tỉnh Quảng Trị"
  })
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 20, fontWeight: "bold", color: "#004275"}}>LÝ LỊCH CÁ NHÂN</Text>
          <Button title="Thay đổi lý lịch" onPress={() => navigation.push("EditProfile")}/>
          <ScrollView>
            <Text style={styles.title}>Thông tin chung:</Text>
            <View style={styles.content}>
              <Text style={styles.label}>Mã sinh viên: </Text>
              <Text style={styles.input}>{student.msv}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Họ và tên: </Text>
              <Text style={styles.input}>{student.fullName}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Giới tính: </Text>
              <Text style={styles.input}>{student.sex}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Ngày sinh: </Text>
              <Text style={styles.input}>{student.dob}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Nơi sinh: </Text>
              <Text style={styles.input}>{student.pob}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Quốc tịch: </Text>
              <Text style={styles.input}>{student.nationality}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Dân tộc: </Text>
              <Text style={styles.input}>{student.nation}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Tôn giáo: </Text>
              <Text style={styles.input}>{student.religion}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Số CMND: </Text>
              <Text style={styles.input}>{student.idNumber}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Ngày cấp: </Text>
              <Text style={styles.input}>{student.dateRange}</Text>
            </View>
            <View style={{flexDirection: "row",marginBottom: 5}}>
              <Text style={styles.label}>Nơi cấp: </Text>
              <Text style={styles.input}>{student.issuedBy}</Text>
            </View>
            <Text style={styles.title}>Thông tin liên hệ, địa chỉ cư trú hiện tại:</Text>
            <View style={styles.content}>
              <Text style={styles.label}>Điện thoại: </Text>
              <Text style={styles.input}>{student.phone}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Di động: </Text>
              <Text style={styles.input}>{student.mobile}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.input}>{student.email}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Hình thức cư trú: </Text>
              <Text style={styles.input}>{student.residenceForm}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Ngày bắt đầu cư trú: </Text>
              <Text style={styles.input}>{student.dateOfResidence}</Text>
            </View>
            <View style={{flexDirection: "row",marginBottom: 5}}>
              <Text style={styles.label}>Địa chỉ cư trú: </Text>
              <Text style={styles.input}>{student.residentialAddress}</Text>
            </View>
            <Text style={styles.title}>Thông tin về quê quán, hộ khẩu thường trú:</Text>
            <View style={styles.content}>
              <Text style={styles.label}>Quê quán: </Text>
              <Text style={styles.input}>{student.homeTown}</Text>
            </View>
            <View style={{flexDirection: "row",marginBottom: 5}}>
              <Text style={styles.label}>Hộ khẩu thường trú: </Text>
              <Text style={styles.input}>{student.permanentResidence}</Text>
            </View>
            </ScrollView>
        </View>
    )
}

const EditProfile = () => {
    return (
        <View>
            <Text>Edit Profile</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default UserProfileStackScreen = ( {navigation} ) => {

    return(
      <Stack.Navigator>
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerTitleAlign: "center", title: "Lý lịch cá nhân", headerLeft: (
            () => <Icon onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{marginLeft: 10}} name="bars" size={30}/>
          )}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerTitleAlign: "center", title: "Thay đổi lý lịch" }}
        />
      </Stack.Navigator>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10
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
    color: "blue"
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 20,
    width: 150
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    paddingRight: 170
  }
})