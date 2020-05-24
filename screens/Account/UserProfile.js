import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Picker,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Input, Button, Text } from "react-native-elements";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");

const UserProfile = ({ navigation, studentProfile }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          LÝ LỊCH CÁ NHÂN
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfile", {
              studentProfile,
            });
          }}
          style={{ marginTop: -2, marginRight: 20 }}
        >
          <FontAwesome name="pencil-square" color="#004275" size={30} />
        </TouchableOpacity>
      </View>
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
          <Text style={styles.input}>
            {studentProfile.GioiTinh ? "Nam" : "Nữ"}
          </Text>
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
          <Text style={styles.input}>{studentProfile.CuTru_ThongTin}</Text>
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
          <Text style={styles.input}>{studentProfile.TTru_ThongTin}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const EditProfile = ({ route }) => {
  var { studentProfile } = route.params;
  const [maSinhVien, setMaSinhVien] = useState("");
  const [hoVaTen, setHoVaTen] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [noiSinhQuocGia, setNoiSinhQuocGia] = useState("");
  const [noiSinhTinhThanh, setNoiSinhTinhThanh] = useState("");
  const [sinhVienNuocNgoai, setSinhVienNuocNgoai] = useState(true);
  const [quocTich, setQuocTich] = useState("");
  const [danToc, setDanToc] = useState("");
  const [tonGiao, setTonGiao] = useState("");
  const [soCMND, setSoCMND] = useState("");
  const [ngayCapCMND, setNgayCapCMND] = useState("");
  const [noiCapCMND, setNoiCapCMND] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [diDong, setDiDong] = useState("");
  const [email, setEmail] = useState("");
  const [hinhThucCuTru, setHinhThucCuTru] = useState("");
  const [kyTucXa, setKyTucXa] = useState("");
  const [cuTruPhuongXa, setCuTruPhuongXa] = useState("");
  const [cuTruQuanHuyen, setCuTruQuanHuyen] = useState("");
  const [cuTruTinhThanh, setCuTruTinhThanh] = useState("");
  const [cuTruQuocGia, setCuTruQuocGia] = useState("");
  const [cuTruDiaChi, setCuTruDiaChi] = useState("");
  const [queQuanPhuongXa, setQueQuanPhuongXa] = useState("");
  const [queQuanQuanHuyen, setQueQuanQuanHuyen] = useState("");
  const [queQuanTinhThanh, setQueQuanTinhThanh] = useState("");
  const [queQuanQuocGia, setQueQuanQuocGia] = useState("");
  const [queQuanDiaChi, setQueQuanDiaChi] = useState("");
  const [thuongTruPhuongXa, setThuongTruPhuongXa] = useState("");
  const [thuongTruQuanHuyen, setThuongTruQuanHuyen] = useState("");
  const [thuongTruTinhThanh, setThuongTruTinhThanh] = useState("");
  const [thuongTruQuocGia, setThuongTruQuocGia] = useState("");
  const [thuongTruDiaChi, setThuongTruDiaChi] = useState("");

  const [tinhThanhVietNam, setTinhThanhVietNam] = useState([]);
  const [tinhThanhTrungQuoc, setTinhThanhTrungQuoc] = useState([]);
  const [tinhThanhConLai, setTinhThanhConLai] = useState([]);
  const [quanHuyenHue, setQuanHuyenHue] = useState([]);
  const [quanHuyenConLai, setQuanHuyenConLai] = useState([]);
  const [phuongXaTpHue, setPhuongXaTpHue] = useState([]);
  const [phuongXaConLai, setPhuongXaConLai] = useState([]);
  
  useEffect(() => {
    setMaSinhVien(studentProfile.MaSinhVien);
    setHoVaTen(studentProfile.HoVaTen);
    setGioiTinh(studentProfile.GioiTinh);
    setNgaySinh(studentProfile.NgaySinh);
    setNoiSinhQuocGia(studentProfile.NoiSinh_QuocGia);
    setNoiSinhTinhThanh(studentProfile.NoiSinh_TinhThanh);
    setSinhVienNuocNgoai(studentProfile.SinhVienNuocNgoai);
    setQuocTich(studentProfile.QuocTich);
    setDanToc(studentProfile.DanToc);
    setTonGiao(studentProfile.TonGiao);
    setSoCMND(studentProfile.SoCMND);
    setNgayCapCMND(studentProfile.NgayCapCMND);
    setNoiCapCMND(studentProfile.NoiCapCMND);
    setDienThoai(studentProfile.DienThoai);
    setDiDong(studentProfile.DiDong);
    setEmail(studentProfile.Email);
    setHinhThucCuTru(studentProfile.CuTru_HinhThuc);
    setKyTucXa(studentProfile.CuTru_KyTucXa);
    setCuTruPhuongXa(studentProfile.CuTru_PhuongXa);
    setCuTruQuanHuyen(studentProfile.CuTru_QuanHuyen);
    setCuTruTinhThanh(studentProfile.CuTru_TinhThanh);
    setCuTruQuocGia(studentProfile.CuTru_QuocGia);
    setCuTruDiaChi(studentProfile.CuTru_DiaChi);
    setQueQuanPhuongXa(studentProfile.QueQuan_PhuongXa);
    setQueQuanQuanHuyen(studentProfile.QueQuan_QuanHuyen);
    setQueQuanTinhThanh(studentProfile.QueQuan_TinhThanh);
    setQueQuanQuocGia(studentProfile.QueQuan_QuocGia);
    setQueQuanDiaChi(studentProfile.QueQuan_DiaChi);
    setThuongTruPhuongXa(studentProfile.TTru_PhuongXa);
    setThuongTruQuanHuyen(studentProfile.TTru_QuanHuyen);
    setThuongTruTinhThanh(studentProfile.TTru_TinhThanh);
    setThuongTruQuocGia(studentProfile.TTru_QuocGia);
    setThuongTruDiaChi(studentProfile.TTru_DiaChi);
    setTinhThanhVietNam([
      ["", "-------"],
      ["45", "Quảng Trị"],
      ["46", "Huế"],
    ]);
    setTinhThanhTrungQuoc([
      ["", "-------"],
      ["101", "Bắc Kinh"],
      ["102", "Thượng Hải"],
      ["103", "Hắc Long Giang"],
    ]);
    setTinhThanhConLai([["", "-------"]]);
    setQuanHuyenHue([
      ["", "-------"],
      ["474", "TP Huế"],
      ["475", "Tứ Hạ"],
      ["476", "Hương Trà"],
    ]);
    setQuanHuyenConLai([["", "-------"]]);
    setPhuongXaTpHue([
      ["", "-------"],
      ["19795", "p.Trường An"],
      ["19796", "p.An Cựu"],
      ["19797", "p.Phú Thuận"],
    ]);
    setPhuongXaConLai([["", "-------"]])
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#004275",
            marginHorizontal: 10,
          }}
        >
          THAY ĐỔI LÝ LỊCH
        </Text>
        <TouchableOpacity style={{ marginTop: -2, marginRight: 20 }}>
          <FontAwesome name="save" color="green" size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.title}>Thông tin chung:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Mã sinh viên:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                disabled
                value={maSinhVien}
                inputStyle={{ paddingLeft: 8 }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Họ và tên:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input disabled value={hoVaTen} inputStyle={{ paddingLeft: 8 }} />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Giới tính:{" "}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#acacac",
                marginLeft: 10,
                padding: 0,
              }}
            >
              <Picker
                selectedValue={gioiTinh}
                style={{ height: 40, width: 110 }}
                onValueChange={(value) => setGioiTinh(value)}
              >
                <Picker.Item label="Nam" value={true} />
                <Picker.Item label="Nữ" value={false} />
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 10,
              borderWidth: 0,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Ngày sinh:{" "}
            </Text>
            <DatePicker
              style={{ width: 150 }}
              date={ngaySinh}
              mode="date"
              placeholder="Nhập ngày sinh"
              format="DD/MM/YYYY"
              minDate="01/01/1980"
              maxDate={`31/12/${new Date().getFullYear()}`}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: -10,
                  top: 0,
                },
                dateInput: {
                  marginLeft: 10,
                  borderWidth: 0,
                  borderBottomWidth: 0.5,
                },
                dateText: {
                  marginLeft: -20,
                  fontSize: 17,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(value) => setNgaySinh(value)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 17, marginTop: 7, width: width * 0.33 }}>
              Nơi sinh:{" "}
            </Text>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#acacac",
                  marginLeft: 10,
                  padding: 0,
                }}
              >
                <Picker
                  selectedValue={noiSinhQuocGia}
                  style={{ height: 40, width: 200 }}
                  onValueChange={(value) => setNoiSinhQuocGia(value)}
                >
                  <Picker.Item label="Việt Nam" value={"001"} />
                  <Picker.Item label="Trung Quốc" value={"002"} />
                </Picker>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#acacac",
                  marginLeft: 10,
                  padding: 0,
                }}
              >
                <Picker
                  selectedValue={noiSinhTinhThanh}
                  style={{ height: 40, width: 200, borderWidth: 1 }}
                  onValueChange={(value) => setNoiSinhTinhThanh(value)}
                >
                  {(noiSinhQuocGia === "001"
                    ? tinhThanhVietNam
                    : tinhThanhTrungQuoc
                  ).map((tinhThanh) => {
                    return (
                      <Picker.Item
                        key={tinhThanh[0]}
                        label={tinhThanh[1]}
                        value={tinhThanh[0]}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Quốc tịch:{" "}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#acacac",
                marginLeft: 10,
                padding: 0,
              }}
            >
              <Picker
                selectedValue={quocTich}
                style={{ height: 40, width: 200, borderWidth: 1 }}
                onValueChange={(value) => setQuocTich(value)}
              >
                <Picker.Item label="Việt Nam" value={"001"} />
                <Picker.Item label="Trung Quốc" value={"002"} />
                <Picker.Item label="Lào" value={"003"} />
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Dân tộc:{" "}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#acacac",
                marginLeft: 10,
                padding: 0,
              }}
            >
              <Picker
                selectedValue={danToc}
                style={{ height: 40, width: 200, borderWidth: 1 }}
                onValueChange={(value) => setDanToc(value)}
              >
                <Picker.Item label="Kinh" value={"01"} />
                <Picker.Item label="Tày" value={"02"} />
                <Picker.Item label="Nùng" value={"03"} />
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Tôn giáo:{" "}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#acacac",
                marginLeft: 10,
                padding: 0,
              }}
            >
              <Picker
                selectedValue={tonGiao}
                style={{ height: 40, width: 200, borderWidth: 1 }}
                onValueChange={setTonGiao}
              >
                <Picker.Item label="Không" value={"01"} />
                <Picker.Item label="Phật giáo" value={"02"} />
                <Picker.Item label="Thiên chúa giáo" value={"03"} />
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Số CMND:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                onChangeText={setSoCMND}
                value={soCMND}
                style={styles.textInput}
                placeholder="Số CMND"
                inputStyle={{ paddingLeft: 8 }}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 10,
              borderWidth: 0,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Ngày cấp:{" "}
            </Text>
            <DatePicker
              style={{ width: 150 }}
              date={ngayCapCMND}
              mode="date"
              placeholder="Ngày cấp"
              format="DD/MM/YYYY"
              minDate="01/01/1980"
              maxDate={`31/12/${new Date().getFullYear()}`}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: -10,
                  top: 0,
                },
                dateInput: {
                  marginLeft: 10,
                  borderWidth: 0,
                  borderBottomWidth: 0.5,
                },
                dateText: {
                  marginLeft: -20,
                  fontSize: 17,
                },
              }}
              onDateChange={value => setNgayCapCMND(value)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Nơi cấp:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                onChangeText={setNoiCapCMND}
                value={noiCapCMND}
                style={styles.textInput}
                placeholder="Nơi cấp CMND"
                inputStyle={{ paddingLeft: 8 }}
              />
            </View>
          </View>

          <Text style={styles.title}>
            Thông tin liên hệ, địa chỉ cư trú hiện tại:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Điện thoại:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                onChangeText={setDienThoai}
                value={dienThoai}
                style={styles.textInput}
                placeholder="Điện thoại"
                inputStyle={{ paddingLeft: 8 }}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Di động:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                onChangeText={setDiDong}
                value={diDong}
                style={styles.textInput}
                placeholder="Di động"
                inputStyle={{ paddingLeft: 8 }}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: 17, width: width * 0.33, marginBottom: 7 }}
            >
              Email:{" "}
            </Text>
            <View style={{ width: width * 0.65 }}>
              <Input
                onChangeText={setEmail}
                value={email}
                style={styles.textInput}
                placeholder="Email"
                inputStyle={{ paddingLeft: 8 }}
                keyboardType={'email-address'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginHorizontal: 2,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                width: width * 0.33,
                marginBottom: 7,
                marginTop: 6,
              }}
            >
              Hình thức{"\n"}cư trú:{" "}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#acacac",
                marginLeft: 10,
                padding: 0,
              }}
            >
              <Picker
                selectedValue={hinhThucCuTru}
                style={{ height: 40, width: 200, borderWidth: 1 }}
                onValueChange={(value) => setHinhThucCuTru(value)}
              >
                <Picker.Item label="Ở nội trú" value={"Ở nội trú"} />
                <Picker.Item label="Ở ngoại trú" value={"Ở ngoại trú"} />
                <Picker.Item
                  label="Theo hộ khẩu thường trú"
                  value={"Theo hộ khẩu thường trú"}
                />
              </Picker>
            </View>
          </View>

          {hinhThucCuTru === "Ở nội trú" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 17, marginTop: 7, width: width * 0.33 }}>
                Địa chỉ{"\n"}cư trú:{" "}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={kyTucXa}
                    style={{ height: 40, width: 200 }}
                    onValueChange={(value) => setKyTucXa(value)}
                  >
                    <Picker.Item label="KTX Đống Đa" value={"DONGDA"} />
                    <Picker.Item label="KTX Tây Lộc" value={"TAYLOC"} />
                    <Picker.Item label="KTX Trường Bia" value={"TRUONGBIA"} />
                  </Picker>
                </View>
              </View>
            </View>
          )}

          {hinhThucCuTru === "Ở ngoại trú" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 17, marginTop: 7, width: width * 0.33 }}>
                Địa chỉ{"\n"}cư trú:{" "}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={cuTruQuocGia}
                    style={{ height: 40, width: 200 }}
                    onValueChange={(value) => setCuTruQuocGia(value)}
                  >
                    <Picker.Item label="------" value={""} />
                    <Picker.Item label="Việt Nam" value={"001"} />
                    <Picker.Item label="Trung Quốc" value={"002"} />
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={cuTruTinhThanh}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setCuTruTinhThanh(value)}
                  >
                    {(cuTruQuocGia === "001"
                      ? tinhThanhVietNam
                      : cuTruQuocGia === "002"
                      ? tinhThanhTrungQuoc
                      : tinhThanhConLai
                    ).map((tinhThanh) => {
                      return (
                        <Picker.Item
                          key={tinhThanh[0]}
                          label={tinhThanh[1]}
                          value={tinhThanh[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={cuTruQuanHuyen}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setCuTruQuanHuyen(value)}
                  >
                    {(cuTruTinhThanh === "46"
                      ? quanHuyenHue
                      : quanHuyenConLai
                    ).map((quanHuyen) => {
                      return (
                        <Picker.Item
                          key={quanHuyen[0]}
                          label={quanHuyen[1]}
                          value={quanHuyen[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={cuTruPhuongXa}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setCuTruPhuongXa(value)}
                  >
                    {(cuTruQuanHuyen === "474"
                      ? phuongXaTpHue
                      : phuongXaConLai
                    ).map((phuongXa) => {
                      return (
                        <Picker.Item
                          key={phuongXa[0]}
                          label={phuongXa[1]}
                          value={phuongXa[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          )}

          {hinhThucCuTru !== "Theo hộ khẩu thường trú" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <View style={{ width: width * 0.33, marginBottom: 7 }}></View>
              <View style={{ width: width * 0.65 }}>
                <Input
                  onChangeText={setCuTruDiaChi}
                  value={cuTruDiaChi}
                  style={styles.textInput}
                  placeholder="Địa chỉ"
                  inputStyle={{ paddingLeft: 8 }}
                />
              </View>
            </View>
          )}
          <Text style={styles.title}>
            Thông tin về quê quán, hộ khẩu thường trú:
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 17, marginTop: 7, width: width * 0.33 }}>
                Quê quán:{" "}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={queQuanQuocGia}
                    style={{ height: 40, width: 200 }}
                    onValueChange={(value) => setQueQuanQuocGia(value)}
                  >
                    <Picker.Item label="------" value={""} />
                    <Picker.Item label="Việt Nam" value={"001"} />
                    <Picker.Item label="Trung Quốc" value={"002"} />
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={queQuanTinhThanh}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setQueQuanTinhThanh(value)}
                  >
                    {(queQuanQuocGia === "001"
                      ? tinhThanhVietNam
                      : queQuanQuocGia === "002"
                      ? tinhThanhTrungQuoc
                      : tinhThanhConLai
                    ).map((tinhThanh) => {
                      return (
                        <Picker.Item
                          key={tinhThanh[0]}
                          label={tinhThanh[1]}
                          value={tinhThanh[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={queQuanQuanHuyen}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setQueQuanQuanHuyen(value)}
                  >
                    {(queQuanTinhThanh === "46"
                      ? quanHuyenHue
                      : quanHuyenConLai
                    ).map((quanHuyen) => {
                      return (
                        <Picker.Item
                          key={quanHuyen[0]}
                          label={quanHuyen[1]}
                          value={quanHuyen[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={queQuanPhuongXa}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setQueQuanPhuongXa(value)}
                  >
                    {(queQuanQuanHuyen === "474"
                      ? phuongXaTpHue
                      : phuongXaConLai
                    ).map((phuongXa) => {
                      return (
                        <Picker.Item
                          key={phuongXa[0]}
                          label={phuongXa[1]}
                          value={phuongXa[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <View style={{ width: width * 0.33, marginBottom: 7 }}></View>
              <View style={{ width: width * 0.65 }}>
                <Input
                  onChangeText={setQueQuanDiaChi}
                  value={queQuanDiaChi}
                  style={styles.textInput}
                  placeholder="Địa chỉ"
                  inputStyle={{ paddingLeft: 8 }}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 17, marginTop: 7, width: width * 0.33 }}>
                Hộ khẩu{"\n"}thường trú:{" "}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={thuongTruQuocGia}
                    style={{ height: 40, width: 200 }}
                    onValueChange={(value) => setThuongTruQuocGia(value)}
                  >
                    <Picker.Item label="------" value={""} />
                    <Picker.Item label="Việt Nam" value={"001"} />
                    <Picker.Item label="Trung Quốc" value={"002"} />
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={thuongTruTinhThanh}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setThuongTruTinhThanh(value)}
                  >
                    {(thuongTruQuocGia === "001"
                      ? tinhThanhVietNam
                      : thuongTruQuocGia === "002"
                      ? tinhThanhTrungQuoc
                      : tinhThanhConLai
                    ).map((tinhThanh) => {
                      return (
                        <Picker.Item
                          key={tinhThanh[0]}
                          label={tinhThanh[1]}
                          value={tinhThanh[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={thuongTruQuanHuyen}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setThuongTruQuanHuyen(value)}
                  >
                    {(thuongTruTinhThanh === "46"
                      ? quanHuyenHue
                      : quanHuyenConLai
                    ).map((quanHuyen) => {
                      return (
                        <Picker.Item
                          key={quanHuyen[0]}
                          label={quanHuyen[1]}
                          value={quanHuyen[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#acacac",
                    marginLeft: 10,
                    padding: 0,
                  }}
                >
                  <Picker
                    selectedValue={thuongTruPhuongXa}
                    style={{ height: 40, width: 200, borderWidth: 1 }}
                    onValueChange={(value) => setThuongTruPhuongXa(value)}
                  >
                    {(thuongTruQuanHuyen === "474"
                      ? phuongXaTpHue
                      : phuongXaConLai
                    ).map((phuongXa) => {
                      return (
                        <Picker.Item
                          key={phuongXa[0]}
                          label={phuongXa[1]}
                          value={phuongXa[0]}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginHorizontal: 2,
                marginTop: 5,
              }}
            >
              <View style={{ width: width * 0.33, marginBottom: 7 }}></View>
              <View style={{ width: width * 0.65 }}>
                <Input
                  onChangeText={setThuongTruDiaChi}
                  value={thuongTruDiaChi}
                  style={styles.textInput}
                  placeholder="Địa chỉ"
                  inputStyle={{ paddingLeft: 8 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
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
  textInput: {
    width: width * 0.9,
    height: 90,
    marginBottom: 20,
    color: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#000",
  },
});

const mapStateToProps = (state) => {
  return {
    studentProfile: state.studentProfile,
  };
};

const UserProfileConnect = connect(mapStateToProps, null)(UserProfile);

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
