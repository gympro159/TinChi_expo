import React, { useState, useCallback } from "react";
import { View, Button, StyleSheet, FlatList, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Text, ButtonGroup } from "react-native-elements";

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
          <Text style={{ fontSize: 15 }}>{message.sender.name}</Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="clock-o" size={16} /> Thời điểm gửi:{" "}
          </Text>
          <Text style={{ fontSize: 15 }}>{message.whenSend}</Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="eye" size={16} /> Người nhận:{" "}
          </Text>
          <Text style={{ fontSize: 15, marginRight: 100 }}>
            {`${message.receiver[0].name}${
              message.receiver.length > 1 ? "; " + message.receiver[1].name : ""
            }${
              message.receiver.length > 2
                ? "; [" + message.receiver.length + "...]"
                : ""
            }`}
          </Text>
        </View>
        <View style={styles.infoMessage}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            <FontAwesome name="clock-o" size={16} /> Thời điểm xem:{" "}
          </Text>
          <Text style={{ fontSize: 15 }}>{message.receiver[0].timeViewed}</Text>
        </View>
      </View>
      <View style={styles.contentMessage}>
        <Text>{message.content}</Text>
      </View>
      <View></View>
    </View>
  );
};

const Inbox = ({ navigation }) => {
  // re-render
  // const [tick, setTick] = useState(0);
  // const forceUpdate = useCallback(() => {
  //   setTick(tick + 1);
  // }, [tick]);

  const [messages, setMessages] = useState([
    {
      seen: false,
      title: "Về việc thi kết thúc học phần Quy trình phát triển phần mềm",
      content: "https://1drv.ms/u/s!AlA3WF7YnKsdg4FDJKuXyVKqkE__Ag",
      sender: {
        idGV: "GV_CNTT_01",
        name: "Nguyễn Văn Trung",
      },
      whenSend: "04-01-2020 07:43",
      receiver: [
        {
          idSV: "16T1021102",
          name: "Lê Ngọc Nghĩa",
          timeViewed: "",
        },
        {
          idSV: "16T1021103",
          name: "Lê Đức Huy",
          timeViewed: "04-01-2020 07:45",
        },
        {
          idSV: "16T1021104",
          name: "Nguyễn Văn Hải",
          timeViewed: "04-01-2020 07:59",
        },
      ],
    },
    {
      seen: false,
      title: "Kiểm tra điểm quá trình môn Java nâng cao và Lập trình phân tán",
      content: "https://1drv.ms/u/s!AlA3WF7YnKsdg4FDJKuXyVKqkE__Ag",
      sender: {
        idGV: "GV_CNTT_01",
        name: "Nguyễn Văn Trung",
      },
      whenSend: "04-02-2020 07:43",
      receiver: [
        {
          idSV: "16T1021102",
          name: "Lê Ngọc Nghĩa",
          timeViewed: "",
        },
        {
          idSV: "16T1021103",
          name: "Lê Đức Huy",
          timeViewed: "04-02-2020 07:45",
        },
        {
          idSV: "16T1021104",
          name: "Nguyễn Văn Hải",
          timeViewed: "04-02-2020 07:59",
        },
      ],
    },
    {
      seen: true,
      title: "[DP] - Bài tập kiểm tra 1 (Lời giải) +Slides giới thiệu Git VCS",
      content: "https://1drv.ms/u/s!AlA3WF7YnKsdg4FDJKuXyVKqkE__Ag",
      sender: {
        idGV: "GV_CNTT_01",
        name: "Nguyễn Văn Trung",
      },
      whenSend: "04-03-2020 07:43",
      receiver: [
        {
          idSV: "16T1021102",
          name: "Lê Ngọc Nghĩa",
          timeViewed: "04-03-2020 07:44",
        },
        {
          idSV: "16T1021103",
          name: "Lê Đức Huy",
          timeViewed: "04-03-2020 07:45",
        },
      ],
    },
  ]);

  const [checkList, setCheckList] = useState(() => {
    const list = [],
      check = false;
    for (let i = 0; i < messages.length; i++) {
      list.push(check);
    }
    return list;
  });

  const [selectedIndex, setSelectedIndex] = useState(1);

  const compose = () => <Text onPress={() => navigation.push("Compose")}>Soạn tin</Text>;
  const inbox = () => <Text>Tin nhắn đến</Text>;
  const sent = () => <Text>Tin nhắn đã gửi</Text>;
  const deleted = () => <Text>Tin đã xóa</Text>;
  const buttons = [
    { element: compose },
    { element: inbox },
    { element: sent },
    { element: deleted },
  ];

  updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Inbox</Text>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedTextStyle= {styles.selectedTextStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
      />
      <Button title="Soạn tin" onPress={() => navigation.push("Compose")} />
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <ListMessages
            message={item}
            checkList={checkList}
            index={index}
            onPress={() => {
              if (messages[index].seen == false) {
                var tempMessages = [...messages],
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
                tempMessages[index].receiver[0].timeViewed = timeViewedtemp;
                tempMessages[index].seen = true;
                setMessages(tempMessages);
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
        keyExtractor={(item) => `${item.whenSend}`}
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
    height: 50, 
    width: WIDTH, 
    marginLeft: 0 
  },
  buttonStyle: {
    
  },
  selectedTextStyle: {
    color: '#FFF',
    fontWeight: '900'
  },
  listButton: {
    textAlign: "center",
  },
});
