import React from "react";
import {Keyboard, StyleSheet, TextInput, View} from "react-native";


const ToDoForm = ({ addTodoHandler }: { addTodoHandler: (text: string) => void }) =>{
    const [text, setText] = React.useState("");

    const handlePress = () => {
        if (text.trim().length === 0) return;

        addTodoHandler(text);
        setText("");
        Keyboard.dismiss();
    };

    return (
        <View style={{ width: "100%", marginTop: 10, paddingHorizontal: 20, alignItems: "center" }}>
            <TextInput
                value={text}
                onChangeText={setText}
                style={styles.textInput}
                placeholder="O que você precisa fazer?"
                placeholderTextColor="#000"
                onSubmitEditing={handlePress}
                returnKeyType="done"
            />
        </View>
    );
}


const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 50,
    },
});

export default ToDoForm;