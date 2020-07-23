import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Text, Input, CheckBox, Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import _ from "lodash";
import { changeAlias, getLocalDateTimeFormat } from "./../../constants/common";

//import components
import ListMessages from "./../../components/ListMessages/ListMessages";
import Compose from "./Compose";

const { width, height } = Dimensions.get("window");

const Message = ({ route }) => {
  var { message } = route.params;
  return (
    <ScrollView
      style={{ padding: 10, paddingTop: 0, backgroundColor: "#FFF", flex: 1 }}
    >
      <View style={{ borderBottomColor: "#000", borderBottomWidth: 1 }}>
        <Text style={styles.titleHeader}>Tin nhắn</Text>
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
    </ScrollView>
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
  const [bold, setBold] = useState(true);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [btnGroupPress, setBtnGroupPress] = useState([true, false, false]);
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
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
        setBtnGroupPress([true, false, false])
        setMessageInbox(messageInboxTemp);
        setMessageSent(messageSentTemp);
        setMessageDeleted(messageDeletedTemp);
        setMessagesRender(messageInboxTemp);
        let list = [];
        for (let i = 0; i < messageInboxTemp.length; i++) {
          list.push(false);
        }
        setCheckList(list);
        setCheckedAll(false);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{
          zIndex: 5,
          elevation: 5,
          backgroundColor: "#3076F1",
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
          borderRadius: 50,
          position: "absolute",
          right: 20,
          bottom: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={() => {
          navigation.push("Compose");
        }}
      >
        <FontAwesome name="pencil" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.containerGroupAction}>
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
        <View style={{ width: width * 0.9 }}>
          <Input
            onChangeText={setFilterInput}
            value={filterInput}
            inputContainerStyle={{
              height: 50,
              width: 250,
              borderBottomWidth: 0,
              borderBottomColor: "#fff",
            }}
            placeholder="Tìm kiếm..."
            leftIcon={
              <FontAwesome
                name="search"
                size={20}
                color="#777"
                style={{ marginRight: 10 }}
              />
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setFilterInput("");
                }}
              >
                <FontAwesome
                  name="close"
                  size={20}
                  color="#777"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 1,
          justifyContent: "space-between",
        }}
      >
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
            setMessagesRender(messageInbox);
            let list = [];
            for (let i = 0; i < messageInbox.length; i++) {
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
            setMessagesRender(messageSent);
            let list = [];
            for (let i = 0; i < messageSent.length; i++) {
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
            setMessagesRender(messageDeleted);
            let list = [];
            for (let i = 0; i < messageDeleted.length; i++) {
              list.push(false);
            }
            setCheckList(list);
          }}
        />
      </View>
      <FlatList
        data={messagesRender}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item, index }) =>
          (!filterInput.trim()
            ? true
            : changeAlias(item.title).includes(changeAlias(filterInput)) ||
              changeAlias(item.nguoiGui.name).includes(
                changeAlias(filterInput)
              )) && (
            <ListMessages
              message={item}
              checkList={checkList}
              index={index}
              onPress={() => {
                if (!item.thoiGianNhan) {
                  var tempMessage = { ...item },
                    timeViewedtemp = getLocalDateTimeFormat();
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
          )
        }
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
    color: "#3076F1",
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
    paddingBottom: 0,
    paddingTop: 10,
  },
  buttonTitleStyle: {
    fontSize: 15,
    color: "#000",
  },
  buttonStylePress: {
    backgroundColor: "#fff",
    paddingBottom: 0,
    paddingTop: 10,
    borderBottomWidth: 2,
    borderColor: "#3076F1",
  },
  buttonTitleStylePress: {
    fontSize: 15,
    color: "#000",
  },
  containerGroupAction: {
    height: 50,
    width: width,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },
  containerCheckboxAll: {
    marginLeft: 21,
    borderWidth: 0,
    borderColor: "#777",
    width: 30,
    height: 50,
  },
  buttonDeleteStyle: {
    borderWidth: 0,
    width: 40,
    height: 50,
    marginBottom: 0,
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
