import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiListProduct } from "@/store/listProduct";
import { AntDesign } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

type PushToken = string | undefined;

interface NotificationData {
  productId?: string;
  route?: string;
  [key: string]: any;
}

// Move notification handler setup outside of component
Notifications.setNotificationHandler({
  handleNotification:
    async (): Promise<Notifications.NotificationBehavior> => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    }),
});

// Move helper functions outside component
const setupAndroidNotificationChannel = async (): Promise<void> => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      enableVibrate: true,
      enableLights: true,
      showBadge: true,
      sound: "default",
    });
  }
};

const handleRegistrationError = (errorMessage: string): never => {
  console.error("Push Notification Error:", errorMessage);
  alert(errorMessage);
  throw new Error(errorMessage);
};

// Create a custom hook for notification setup
const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { kirimID } = apiListProduct();

  const registerForPushNotificationsAsync = async (): Promise<PushToken> => {
    if (!Device.isDevice) {
      handleRegistrationError(
        "Must use physical device for push notifications"
      );
    }

    if (Platform.OS === "android") {
      await setupAndroidNotificationChannel();
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
      return undefined;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log("Push Notification Token:", token.data);
      await kirimID({ id_expo: token.data });
      return token.data;
    } catch (error) {
      console.error("Error getting push token:", error);
      handleRegistrationError(`Failed to get push token: ${error}`);
      return undefined;
    }
  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data = response.notification.request.content.data as NotificationData;
    console.log("Notification Response Data:", data.someData);
    const notifNavigate = data.someData;

    const navigateToScreen = () => {
      try {
        router.push({
          pathname: "/components/Modal/DetailProductApprove",
          params: {
            nama_toko: notifNavigate.nama_toko,
            product_id: notifNavigate.productId,
          },
        });
      } catch (error) {
        console.error("Navigation error:", error);
        router.push("/components/Modal/DetailProductApprove");
      }
    };

    if (Platform.OS === "android") {
      setTimeout(navigateToScreen, 200);
    } else {
      navigateToScreen();
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          console.log("Updated Push Token:", token);
        }
      })
      .catch((error: Error) => {
        console.error("Registration Error:", error);
        setExpoPushToken(`Error: ${error.message}`);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        console.log("Received notification:", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return { expoPushToken, notification };
};

// Main component
export default function RootLayout() {
  const isDarkMode = useColorScheme() =="dark";
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const token = AsyncStorage.getItem("token");
  const { expoPushToken, notification } = useNotifications();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="components/Penyedia/detailPenyedia"
        options={({ route }: any) => ({
          headerShown: true,
          headerTitle: `Detail ${route.params?.name}`,
          headerTitleAlign: "center",
          headerStyle: {
             backgroundColor: isDarkMode ? "#1F2937" : "#f3f4f6" ,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color:  isDarkMode ? "white" : "#1F2937" ,
          },
          headerShadowVisible: true,
          animation: "slide_from_right",
          headerLeft: ({ color }: any) => (
            <TouchableOpacity onPress={() => router.back()}>
             <AntDesign name="left" size={24} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="components/Modal/DetailProductApprove"
        options={({ route }: any) => ({
          headerShown: false,
          presentation: "modal",
          headerTitle: route?.params?.nama_toko || "Detail Product",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>← Kembali</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          title: "Oops!",
        }}
      />
    </Stack>
  );
}
