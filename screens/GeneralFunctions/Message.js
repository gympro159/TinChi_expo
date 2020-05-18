import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Text, ButtonGroup, CheckBox, Button } from "react-native-elements";
import axios from "axios";
import _ from "lodash";

//import components
import ListMessages from "./../../components/ListMessages/ListMessages";
import Compose from "./Compose";

const { width, height } = Dimensions.get("window");

const Message = ({ route }) => {
  var { message } = route.params;
  return (
    <View style={{ padding: 10, paddingTop: 0 }}>
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }}>
        <Text style={styles.titleHeader}>Tin nhắn đến</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}> {message.title}</Text>
      <View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="envelope" size={16} /> Người gửi:{" "}
          </Text>
          <Text style={{ fontSize: 15 }}>{message.nguoiGui.name}</Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="clock-o" size={16} /> Thời điểm gửi:{" "}
          </Text>
          <Text style={{ fontSize: 15 }}>{message.thoiGianGui}</Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="eye" size={16} /> Người nhận:{" "}
          </Text>
          <Text style={{ fontSize: 15, marginRight: 100 }}>
            {`${message.nguoiNhan[0].name}${
              message.nguoiNhan.length > 1
                ? "; " + message.nguoiNhan[1].name
                : ""
            }${
              message.nguoiNhan.length > 2
                ? "; [" + message.nguoiNhan.length + "...]"
                : ""
            }`}
          </Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="clock-o" size={16} /> Thời điểm xem:{" "}
          </Text>
          <Text style={{ fontSize: 15 }}>{message.thoiGianNhan}</Text>
        </View>
      </View>
      <View style={styles.contentMessage}>
        <Text>{message.content}</Text>
      </View>
    </View>
  );
};

const Inbox = ({ navigation }) => {
  // re-render
  // const [tick, setTick] = useState(0);
  // const forceUpdate = useCallback(() => {
  //   setTick(tick + 1);
  // }, [tick]);
  const [messagesRender, setMessagesRender] = useState([]);
  const [messageInbox, setMessageInbox] = useState([]);
  const [messageSent, setMessageSent] = useState([]);
  const [messageDeleted, setMessageDeleted] = useState([]);
  const [locationPage, setLocationPage] = useState(0);
  const lengthPage = 2;
  useEffect(() => {
    axios
      .get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/message`)
      .then((res) => {
        let messageInboxTemp = [],
          messageSentTemp = [],
          messageDeletedTemp = [];
        for (let length = res.data.length, i = length - 1; i >= 0; i--) {
          if (res.data[i].loaiTin === 1) {
            messageInboxTemp.push(res.data[i]);
          } else if (res.data[i].loaiTin === 2) {
            messageSentTemp.push(res.data[i]);
          } else if (res.data[i].loaiTin === 3) {
            messageDeletedTemp.push(res.data[i]);
          }
        }
        messageInboxTemp = _.chunk(messageInboxTemp, lengthPage);
        messageSentTemp = _.chunk(messageSentTemp, lengthPage);
        messageDeletedTemp = _.chunk(messageDeletedTemp, lengthPage);
        setMessageInbox(messageInboxTemp);
        setMessageSent(messageSentTemp);
        setMessageDeleted(messageDeletedTemp);
        setMessagesRender(messageInboxTemp[locationPage]);
        let list = [];
        for (let i = 0; i < messageInboxTemp.length; i++) {
          list.push(false);
        }
        setCheckList(list);
      });
  }, []);

  const [bold, setBold] = useState(true);

  const [checkedAll, setCheckedAll] = useState(false);

  const [checkList, setCheckList] = useState([]);

  const [btnGroupPress, setBtnGroupPress] = useState([true, false, false]);
  

  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", marginLeft: 1 }}>
        <Button
          title=""
          icon={
            <FontAwesome name="send" size={25} color="#337AB7" />
          }
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
          onPress={() => {
            navigation.push("Compose");
          }}
        />
        <Button
          title="Tin nhắn đến"
          buttonStyle={
            btnGroupPress[0] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[0]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            setBtnGroupPress([true, false, false]);
            setLocationPage(0);
            setMessagesRender(messageInbox[0]);
            let list = [];
            for (let i = 0; i < messagesRender.length; i++) {
              list.push(false);
            }
            setCheckList(list);
          }}
        />
        <Button
          title="Tin nhắn đã gửi"
          buttonStyle={
            btnGroupPress[1] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[1]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            setBtnGroupPress([false, true, false]);
            setLocationPage(0);
            setMessagesRender(messageSent[0]);
            let list = [];
            for (let i = 0; i < messagesRender.length; i++) {
              list.push(false);
            }
            setCheckList(list);
          }}
        />
        <Button
          title="Tin đã xóa"
          buttonStyle={
            btnGroupPress[2] ? styles.buttonStylePress : styles.buttonStyle
          }
          titleStyle={
            btnGroupPress[2]
              ? styles.buttonTitleStylePress
              : styles.buttonTitleStyle
          }
          onPress={() => {
            setBtnGroupPress([false, false, true]);
            setLocationPage(0);
            setMessagesRender(messageDeleted[0]);
            let list = [];
            for (let i = 0; i < messagesRender.length; i++) {
              list.push(false);
            }
            setCheckList(list);
          }}
        />
      </View>
      <View style={styles.containerGroupAction}>
        <View style={styles.containerSelectAllftDelete}>
          <View style={styles.containerCheckboxAll}>
            <CheckBox
              center
              checked={checkedAll}
              onPress={() => {
                setCheckedAll(!checkedAll);
                let list = [];
                for (let i = 0; i < messagesRender.length; i++) {
                  list.push(!checkedAll);
                }
                setCheckList(list);
              }}
            />
          </View>
          <View>
            <Button
              buttonStyle={styles.buttonDeleteStyle}
              type="outline"
              icon={<FontAwesome name="trash-o" size={24} color="red" />}
            />
          </View>
        </View>
        <View style={styles.containerPaginationBtn}>
          <Button
            buttonStyle={styles.buttonPagination}
            type="outline"
            icon={<FontAwesome name="fast-backward" size={15} color="grey" />}
            onPress={() => {
              setLocationPage(0);
              if (btnGroupPress[0]) {
                setMessagesRender(messageInbox[0]);
              } else if (btnGroupPress[1]) {
                setMessagesRender(messageSent[0]);
              } else if (btnGroupPress[2]) {
                setMessagesRender(messageDeleted[0]);
              }
            }}
          />
          <Button
            buttonStyle={styles.buttonPagination}
            type="outline"
            icon={<FontAwesome name="chevron-left" size={15} color="grey" />}
            onPress={() => {
              if (locationPage !== 0 && btnGroupPress[0]) {
                setLocationPage(locationPage - 1);
                setMessagesRender(messageInbox[locationPage - 1]);
              } else if (locationPage !== 0 && btnGroupPress[1]) {
                setLocationPage(locationPage - 1);
                setMessagesRender(messageSent[locationPage - 1]);
              } else if (locationPage !== 0 && btnGroupPress[2]) {
                setLocationPage(locationPage - 1);
                setMessagesRender(messageDeleted[locationPage - 1]);
              }
            }}
          />
          <Button
            disabled
            buttonStyle={styles.buttonLocation}
            titleStyle={styles.buttonLocationTitle}
            type="outline"
            title={`Trang ${locationPage + 1}: ${
              btnGroupPress[2]
                ? messageDeleted.length
                : btnGroupPress[1]
                ? messageSent.length
                : messageInbox.length
            }`}
          />
          <Button
            buttonStyle={styles.buttonPagination}
            type="outline"
            icon={<FontAwesome name="chevron-right" size={15} color="grey" />}
            onPress={() => {
              if (
                locationPage !== messageInbox.length - 1 &&
                btnGroupPress[0]
              ) {
                setLocationPage(locationPage + 1);
                setMessagesRender(messageInbox[locationPage + 1]);
              } else if (
                locationPage !== messageSent.length - 1 &&
                btnGroupPress[1]
              ) {
                setLocationPage(locationPage + 1);
                setMessagesRender(messageSent[locationPage + 1]);
              } else if (
                locationPage !== messageDeleted.length - 1 &&
                btnGroupPress[2]
              ) {
                setLocationPage(locationPage + 1);
                setMessagesRender(messageDeleted[locationPage + 1]);
              }
            }}
          />
          <Button
            buttonStyle={styles.buttonPagination}
            type="outline"
            icon={<FontAwesome name="fast-forward" size={15} color="grey" />}
            onPress={() => {
              if (btnGroupPress[0]) {
                setLocationPage(messageInbox.length - 1);
                setMessagesRender(messageInbox[messageInbox.length - 1]);
              } else if (btnGroupPress[1]) {
                setLocationPage(messageInbox.length - 1);
                setMessagesRender(messageSent[messageInbox.length - 1]);
              } else if (btnGroupPress[2]) {
                setLocationPage(messageInbox.length - 1);
                setMessagesRender(messageDeleted[messageInbox.length - 1]);
              }
            }}
          />
        </View>
      </View>
      <FlatList
        data={messagesRender}
        renderItem={({ item, index }) => (
          <ListMessages
            message={item}
            checkList={checkList}
            index={index}
            onPress={() => {
              if (!item.thoiGianNhan) {
                var tempMessage = { ...item },
                  date = new Date(),
                  timeViewedtemp = `${
                    date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
                  }-${
                    date.getMonth() > 8
                      ? date.getMonth() + 1
                      : "0" + (date.getMonth() + 1)
                  }-${date.getFullYear()} ${
                    date.getHours() > 9
                      ? date.getHours()
                      : "0" + date.getHours()
                  }:${
                    date.getMinutes() > 9
                      ? date.getMinutes()
                      : "0" + date.getMinutes()
                  }`;
                tempMessage.thoiGianNhan = timeViewedtemp;
                item.thoiGianNhan = timeViewedtemp;
                setBold(!bold);
                axios.put(
                  `https://5e88429a19f5190016fed3f8.mockapi.io/school/message/${item.id}`,
                  tempMessage
                );
              }
              navigation.navigate("Message", {
                message: item,
              });
            }}
            onChecked={() => {
              var tempList = [...checkList];
              tempList[index] = !tempList[index];
              setCheckList(tempList);
            }}
          />
        )}
        keyExtractor={(item) => `${item.thoiGianGui}`}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default MessageStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerTitleAlign: "center",
          title: "Tin nhắn",
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
        name="Message"
        component={Message}
        options={({ route }) => ({
          title: route.params.message.title,
          headerTitleAlign: "left",
          headerTitleStyle: {
            width: width - 100,
          },
        })}
      />
      <Stack.Screen
        name="Compose"
        component={Compose}
        options={{
          headerTitleAlign: "center",
          title: "Soạn tin",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleHeader: {
    textTransform: "uppercase",
    color: "#004275",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  infoMessage: {
    flexDirection: "row",
    paddingTop: 10,
  },
  contentMessage: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: "#777",
    borderTopWidth: 1,
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
  containerGroupAction: {
    backgroundColor: "#FFF",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerSelectAllftDelete: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerPaginationBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 5,
  },
  containerCheckboxAll: {
    marginLeft: 21,
    borderWidth: 0,
    borderColor: "#777",
    width: 30,
    height: 30,
  },
  buttonDeleteStyle: {
    borderWidth: 0,
    width: 40,
    height: 30,
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonLocation: {
    borderWidth: 0,
    height: 30,
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  buttonLocationTitle: {
    color: "grey",
    fontSize: 13,
  },
  buttonPagination: {
    borderWidth: 0,
    height: 30,
    paddingHorizontal: 3,
  },
});
