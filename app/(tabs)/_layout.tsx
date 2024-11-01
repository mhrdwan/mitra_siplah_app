import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, StyleSheet, View, Dimensions } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: isDark ? '#fff' : '#000',
            tabBarInactiveTintColor: isDark ? '#666' : '#999',
            tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 50,  
              right: 50, 
              backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
              borderRadius: 30, 
              height: 65, 
              paddingBottom: 10,
              ...styles.shadow
            },
            tabBarItemStyle: {
              padding: 5,
              marginTop: 5,
              marginHorizontal: -15,
            },
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              marginTop: -5
            }
          }}
        >
          <Tabs.Screen
            name="dashboard/index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <AntDesign name="home" size={24} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="product/index"
            options={{
              title: "Product",
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <AntDesign name="profile" size={24} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="penyedia/index"
            options={{
              title: "Penyedia",
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <AntDesign name="pay-circle-o1" size={24} color={color} />
                </View>
              ),
            }}
          />
        </Tabs>
      </View>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,  
  }
});