import { useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text, TextInput, Modal, Pressable } from "react-native";

const CREATE_QUERY = "INSERT INTO accounts (name, secret) VALUES (?,?)";

const NewAccount = ({ db }: { db: SQLite.SQLiteDatabase }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [secret, setSecret] = useState("");

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22,
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                            backgroundColor: "white",
                            borderRadius: 20,
                            padding: 35,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <View className="flex flex-col gap-5 mb-5">
                            <TextInput
                                className="font-bold py-4 px-5 bg-gray-300"
                                onChangeText={setName}
                                value={name}
                                placeholder="Enter name for account"
                            />
                            <TextInput
                                className="font-bold py-4 px-5 bg-gray-300"
                                onChangeText={setSecret}
                                value={secret}
                                placeholder="Enter Secret"
                            />
                        </View>
                        <View className="flex flex-col gap-5">
                            <Pressable
                                onPress={() => {
                                    db.transaction((tx) => {
                                        tx.executeSql(CREATE_QUERY, [
                                            name,
                                            secret,
                                        ]);
                                    });

                                    setName("");
                                    setSecret("");

                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text className="bg-blue-500 text-white font-bold py-4 px-5">
                                    Create
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text className="bg-blue-500 text-white font-bold py-4 px-5">
                                    Hide Modal
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                <Text className="bg-blue-500 text-white font-bold py-4 px-5">
                    Add Account
                </Text>
            </Pressable>
        </View>
    );
};

export default NewAccount;
