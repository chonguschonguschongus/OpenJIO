import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
import Home from "./screens/Home";
import Details from "./screens/Details";
import LoginPage from "./screens/LoginPage";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile";
import Username from "./screens/Username";
import Create from "./screens/Create";
import MyEvent from "./screens/MyEvent";
import Edit from "./screens/Edit";
import Forget from "./screens/Forget";
import Favorite from "./screens/Favorite";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Forget" component={Forget} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Edit" component={Edit} />
  </Stack.Navigator>
);

const UserProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="Username" component={Username} />
  </Stack.Navigator>
);

const MyEventStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyEventPage" component={MyEvent} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Edit" component={Edit} />
  </Stack.Navigator>
);

const MainTabs = () => {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyEvent"
        component={MyEventStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="AuthStack" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ animationTypeForReplace: "pop" }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ animationTypeForReplace: "pop" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;