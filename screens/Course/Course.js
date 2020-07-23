import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import "intl";
import "intl/locale-data/jsonp/en";
import { NumberFormat, I18nProvider } from "@lingui/react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import callApi from "./../../utils/apiCaller";
import { convertTime, getDateFormat } from "./../../constants/common";
// import Compose from "./../GeneralFunctions/Compose";

const WIDTH = Dimensions.get("window").width;

export default Course = ({ route, navigation }) => {
  var { MaLopHocPhan, MaHocTap, dataToken } = route.params;
  const [btnGroupPress, setBtnGroupPress] = useState([true, false]);
  const [course, setCourse] = useState({});
  const [subject, setSubject] = useState({});
  const [danhSachLop, setDanhSachLop] = useState([]);
  const [tableStudentContent, setTableStudentContent] = useState([]);
  const [loading, setLoading] = useState(true);
  var week = ["Chủ nhât", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  useEffect(() => {
    var header = {
      "ums-application": dataToken.AppId,
      "ums-time": convertTime(new Date()),
      "ums-token": dataToken.Token,
      "Content-Type": "application/json",
    };
    Promise.all([
      callApi(
        `student-services/danh-sach-sinh-vien-lop-hoc-phan?malophocphan=${MaLopHocPhan}`,
        "GET",
        null,
        header
      ),
      callApi(
        `student-services/thong-tin-lop-hoc-phan?malophocphan=${MaLopHocPhan}&mahoctap=${MaHocTap}`,
        "GET",
        null,
        header
      ),
    ]).then(([dslRes, courseRes]) => {
      setDanhSachLop(dslRes.data.Data);
      let tableContentTemp = [];
      dslRes.data.Data.forEach((student, index) => {
        tableContentTemp.push([
          `${index + 1}`,
          `${student.MaSinhVien}`,
          `${student.HoDem} ${student.Ten}`,
        ]);
      });
      setTableStudentContent(tableContentTemp);
      setCourse(courseRes.data.Data);
      callApi(
        `common/module/get?moduleId=${courseRes.data.Data.MaHocPhan}`
      ).then((subjectRes) => {
        var _subject = subjectRes.data.Data;
        callApi(`common/department/get?deptId=${_subject.MaDonVi}`).then(
          (res) => {
            var subjectTemp = Object.assign({}, _subject, {
              DonVi: res.data.Data,
            });
            setSubject(subjectTemp);
            setLoading(false);
          }
        );
      });
    });
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ActivityIndicator size="large" color="#3076F1" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#3076F1",
          marginLeft: 10,
        }}
      >
        Thông tin về lớp học phần
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Thông tin LHP"
            buttonStyle={
              btnGroupPress[0] ? styles.buttonStylePress : styles.buttonStyle
            }
            titleStyle={
              btnGroupPress[0]
                ? styles.buttonTitleStylePress
                : styles.buttonTitleStyle
            }
            onPress={() => {
              setBtnGroupPress([true, false]);
            }}
          />
          <Button
            title="Danh sách sinh viên"
            buttonStyle={
              btnGroupPress[1] ? styles.buttonStylePress : styles.buttonStyle
            }
            titleStyle={
              btnGroupPress[1]
                ? styles.buttonTitleStylePress
                : styles.buttonTitleStyle
            }
            onPress={() => {
              setBtnGroupPress([false, true]);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Compose", {
                listNguoiNhan: danhSachLop,
              });
            }}
          >
            <FontAwesome name="envelope" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {btnGroupPress[0] ? (
        <ScrollView style={{ borderTopWidth: 0.5, borderTopColor: "#dbdbdb" }}>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontSize: 15,
              color: "blue",
            }}
          >
            Thông tin chung:
          </Text>
          <View style={styles.content}>
            <Text style={styles.label}>Tên lớp học phần: </Text>
            <Text style={styles.input}>{course.TenLopHocPhan}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Mã lớp học phần: </Text>
            <Text style={styles.input}>{course.MaLopHocPhan}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số tín chỉ: </Text>
            <Text style={styles.input}>{course.SoTinChi}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Giảng viên: </Text>
            <Text style={styles.input}>
              {course.GiangVien[course.GiangVien.length - 1]}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Đơn vị phụ trách: </Text>
            <Text style={styles.input}>{subject.DonVi.TenDonVi}</Text>
          </View>

          <Text style={styles.title}>Thông tin về tổ chức, hoạt động:</Text>
          <View style={styles.content}>
            <Text style={styles.label}>Ngày hết hạn đăng ký: </Text>
            <Text style={styles.input}>
              {getDateFormat(new Date(course.NgayHetHanDangKy))}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thời gian học theo TKB: </Text>
            <Text style={styles.input}>
              {getDateFormat(new Date(course.ThoiKhoaBieu[0].NgayHoc))}-
              {getDateFormat(
                new Date(
                  course.ThoiKhoaBieu[course.ThoiKhoaBieu.length - 1].NgayHoc
                )
              )}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thời khóa biểu (tuần đầu): </Text>
            <Text style={styles.input}>
              {week[new Date(course.ThoiKhoaBieu[0].NgayHoc).getDay()]}
              {"["}
              {course.ThoiKhoaBieu[0].TietBatDau}-
              {course.ThoiKhoaBieu[0].TietBatDau +
                course.ThoiKhoaBieu[0].SoTiet -
                1}
              {", "}
              {course.ThoiKhoaBieu[0].TenPhongHoc}
              {"]"}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Hình thức học: </Text>
            <Text style={styles.input}>{subject.MaHinhThucHoc}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số giờ kế hoạch: </Text>
            <Text style={styles.input}>{subject.TongSoGio}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Số lượng sinh viên: </Text>
            <Text style={styles.input}>
              Tối thiểu: {course.SoSinhVienToiThieu}
              {"\n"}Tối đa: {course.SoSinhVienToiDa}
              {"\n"}Đã đăng ký: {course.SoSinhVienDangKy}
              {"\n"}Đã duyệt: {course.SoSinhVienDaDuyet}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Trạng thái hoạt động: </Text>
            <Text style={styles.input}>{course.MoTaTrangThaiLop}</Text>
          </View>

          <Text style={styles.title}>
            Cách đánh giá điểm quá trình học, điểm thi kết thúc học phần (dự
            kiến):
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.label}>Công thức tính điểm: </Text>
            <Text style={styles.input}>{subject.CongThucTinhDiemDanhGia}</Text>
          </View>

          {course.ThongTinDangKy && (
            <>
              <Text style={styles.title}>
                Kết quả đánh giá quá trình học tập
              </Text>
              <View style={styles.content}>
                <Text style={styles.label}>Điểm QTHT: </Text>
                <Text style={styles.input}>
                  {course.ThongTinDangKy.DiemQTHT}
                </Text>
              </View>

              <Text style={styles.title}>
                Thông tin liên quan đến đăng ký học của sinh viên:
              </Text>
              <View style={styles.content}>
                <Text style={styles.label}>Thời điểm đăng ký: </Text>
                <Text style={styles.input}>
                  {getDateFormat(new Date(course.ThongTinDangKy.NgayDangKy))}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Hình thức đăng ký: </Text>
                <Text style={styles.input}>
                  {course.ThongTinDangKy.SinhVienTuDangKy
                    ? "Sinh viên đăng ký"
                    : "Phòng Đào tạo xếp lớp"}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Tính tích lũy tín chỉ: </Text>
                <Text style={styles.input}>
                  {course.ThongTinDangKy.CoTichLuy
                    ? "Học phần có tính tích lũy tín chỉ"
                    : "Học phần không tính tích lũy tín chỉ"}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Trạng thái xử lý: </Text>
                <Text style={styles.input}>
                  {course.ThongTinDangKy.Duyet ? "Đã duyệt" : "Chưa được duyệt"}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Thời điểm xử lý: </Text>
                <Text style={styles.input}>
                  {course.ThongTinDangKy.NgayDuyet
                    ? getDateFormat(new Date(course.ThongTinDangKy.NgayDuyet))
                    : ""}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.label}>Lần học: </Text>
                <Text style={styles.input}>{course.ThongTinDangKy.LanHoc}</Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={styles.label}>Học phí: </Text>
                <Text style={styles.input}>
                  <I18nProvider>
                    <NumberFormat value={course.ThongTinDangKy.HocPhi} />
                  </I18nProvider>
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      ) : (
        <>
          <Table
            borderStyle={{
              borderColor: "#d6e4fc",
              borderWidth: 1,
            }}
          >
            <Row
              data={["STT", "Mã sinh viên", "Họ và tên"]}
              style={styles.titleTable}
              textStyle={styles.titleTableText}
              widthArr={[WIDTH * 0.1, WIDTH * 0.3, WIDTH * 0.6]}
            />
          </Table>
          <ScrollView style={{}}>
            <Table
              borderStyle={{
                borderColor: "#d6e4fc",
                borderWidth: 1,
              }}
            >
              {tableStudentContent.map((row, index) => {
                return (
                  <Row
                    key={index}
                    data={row}
                    style={
                      index % 2 ? styles.contentTable2 : styles.contentTable
                    }
                    textStyle={styles.contentTableText}
                    widthArr={[WIDTH * 0.1, WIDTH * 0.3, WIDTH * 0.6]}
                  />
                );
              })}
            </Table>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  buttonTitleStyle: {
    color: "#337AB7",
    fontSize: 13,
  },
  buttonStylePress: {
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#F4F4F4",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  buttonTitleStylePress: {
    color: "#000",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
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
  titleTable: {
    backgroundColor: "#d6e4fc",
    height: 40,
  },
  contentTable: {
    backgroundColor: "#eaf1fe",
    minHeight: 40,
  },
  contentTable2: {
    backgroundColor: "#fff",
    minHeight: 40,
  },
  titleTableText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  contentTableText: {
    textAlign: "center",
  },
});
