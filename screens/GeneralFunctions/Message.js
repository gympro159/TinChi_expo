import React, { useState, useCallback, useEffect } from "react";
import { View, Button, StyleSheet, FlatList, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Text, ButtonGroup } from "react-native-elements";
import axios from "axios";

//import components
import ListMessages from "./../../components/ListMessages/ListMessages";

const WIDTH = Dimensions.get("window").width;
// const AllCheck = () => {
//   const iconNames = ['reload1', 'close']
//   return (
//     <CheckBox
//       checked={this.state.checked}
//     />
//   )
// }

const Message = ({ navigation, route }) => {
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
              message.nguoiNhan.length > 1 ? "; " + message.nguoiNhan[1].name : ""
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
  const [messagesRender, setMessagesRender] = useState([])

  useEffect(() => {
    axios.get(`https://5e88429a19f5190016fed3f8.mockapi.io/school/message`).then(res=> {
      setMessages(res.data);
      let messagesTemp = []
      res.data.forEach(message => {
        if(message.loaiTin===1){
          messagesTemp.push(message);
        }
      })
      let list = [];
      for (let i = 0; i < messagesTemp.length; i++) {
        list.push(false);
      }
      setMessagesRender(messagesTemp);
      setCheckList(list);
    })
  }, [])
  
  const [bold, setBold] = useState(true)

  const [messages, setMessages] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(1);
  
  const [checkList, setCheckList] = useState([]);
  
  const compose = () => (
    <Text
      style={{ fontSize: 13, textAlign: "center" }}
      onPress={() => navigation.push("Compose")}
    ><FontAwesome name="send" size={15}/>
       {" "}Soạn tin
    </Text>
  );
  const inbox = () => (
    <Text style={{ fontSize: 13, textAlign: "center" }}>Tin nhắn đến</Text>
  );
  const sent = () => (
    <Text style={{ fontSize: 13, textAlign: "center" }}>
      Tin nhắn{"\n"} đã gửi
    </Text>
  );
  const deleted = () => (
    <Text style={{ fontSize: 13, textAlign: "center" }}>Tin đã xóa</Text>
  );
  const buttons = [
    { element: compose },
    { element: inbox },
    { element: sent },
    { element: deleted },
  ];

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    let tempMessages = [];
      let loaiTin = selectedIndex!==0?selectedIndex:1;
      messages.forEach(message => {
        if(message.loaiTin===loaiTin){
          tempMessages.push(message);
        }
      })
      setMessagesRender(tempMessages);
      let list = [];
      for (let i = 0; i < tempMessages.length; i++) {
        list.push(false);
      }
      setCheckList(list)
  };
  return (
    <View style={{ flex: 1 }}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedTextStyle={styles.selectedTextStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
      />
      <FlatList
        data={messagesRender}
        renderItem={({ item, index }) => (
          <ListMessages
            message={item}
            checkList={checkList}
            index={index}
            onPress={() => {
              if (!item.thoiGianNhan) {
                var tempMessage = {...item},
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
                item.thoiGianNhan = timeViewedtemp
                setBold(!bold)
                axios.put(`https://5e88429a19f5190016fed3f8.mockapi.io/school/message/${item.id}`, tempMessage)
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

const Compose = () => {
  return (
    <View>
      <Text>Compose</Text>
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
          title: "Tin nhắn đến",
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
            width: WIDTH - 100,
          },
        })}
      />
      <Stack.Screen
        name="Compose"
        component={Compose}
        options={{ headerTitleAlign: "center", title: "Soạn tin" }}
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
  containerStyle: {
    height: 40,
    width: WIDTH,
    marginLeft: 0,
    marginTop: 0,
  },
  buttonStyle: {
    backgroundColor: "#FFF",
    opacity: 1
  },
  selectedButtonStyle: {
    backgroundColor: "#0080ff",
    opacity: 0.7
  },
  selectedTextStyle: {
    color: "#FFF",
  },
  listButton: {
    textAlign: "center",
  },
});
