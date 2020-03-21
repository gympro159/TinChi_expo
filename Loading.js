import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default Loading = () => {
    return (
        <View style={styles.Container}>
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
