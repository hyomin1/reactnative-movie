import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { YELLOW_COLOR } from "../colors";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerBackVisible: false,
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
