import React, { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FAB, Portal, Provider as PaperProvider } from "react-native-paper";

interface TabIconProps {
  name: string;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, size = 24 }) => {
  const iconColor = focused ? "#6366F1" : "#9CA3AF";

  const renderIcon = () => {
    switch (name) {
      case "home":
        return <MaterialIcons name="home" size={size} color={iconColor} />;
      case "stats":
        return <MaterialIcons name="bar-chart" size={size} color={iconColor} />;
      case "insights":
        return (
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={size}
            color={iconColor}
          />
        );
      case "education":
        return (
          <MaterialCommunityIcons
            name="book-open-variant"
            size={size}
            color={iconColor}
          />
        );
      default:
        return <MaterialIcons name="help" size={size} color={iconColor} />;
    }
  };

  return renderIcon();
};

const CenterLogButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.centerButtonContainer} onPress={onPress}>
      <View style={styles.centerButton}>
        <MaterialIcons name="add" size={28} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};

function TabsContent() {
  const [fabOpen, setFabOpen] = useState(false);
  const router = useRouter();

  const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open);

  const handleCenterButtonPress = () => {
    setFabOpen(!fabOpen);
  };

  const fabActions = [
    {
      icon: "heart-pulse",
      label: "Contractions",
      onPress: () => router.push("/log-contractions"),
      small: false,
    },
    {
      icon: "baby",
      label: "Fetal Movements",
      onPress: () => router.push("/log-fetal-movements"),
      small: false,
    },
    {
      icon: "run",
      label: "Activity",
      onPress: () => router.push("/log-activity"),
      small: false,
    },
    {
      icon: "medical-bag",
      label: "Symptoms",
      onPress: () => router.push("/log-symptoms"),
      small: false,
    },
    {
      icon: "sleep",
      label: "Sleep",
      onPress: () => router.push("/log-sleep"),
      small: false,
    },
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#6366F1",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
        }}
      >
        {/* Visible Tabs */}
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon name="home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Stats",
            tabBarIcon: ({ focused }) => (
              <TabIcon name="stats" focused={focused} />
            ),
          }}
        />

        {/* Center Log Tab - Custom Button */}
        <Tabs.Screen
          name="logs"
          options={{
            tabBarButton: () => (
              <CenterLogButton onPress={handleCenterButtonPress} />
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ focused }) => (
              <TabIcon name="insights" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="education"
          options={{
            title: "Learn",
            tabBarIcon: ({ focused }) => (
              <TabIcon name="education" focused={focused} />
            ),
          }}
        />

        {/* Hidden Tabs - Not shown in tab bar */}
        <Tabs.Screen
          name="help"
          options={{
            href: null, // This hides the tab from the tab bar
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(dashboard)"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(education)"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(history)"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(logs)"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <Portal>
        <FAB.Group
          open={fabOpen}
          visible
          icon={fabOpen ? "close" : "plus"}
          actions={fabActions}
          onStateChange={onStateChange}
          onPress={() => {
            if (fabOpen) {
              // Close the FAB
              setFabOpen(false);
            }
          }}
          fabStyle={[styles.fab, { display: "none" }]} // Hide the default FAB since we're using custom button
          theme={{
            colors: {
              primary: "#6366F1",
              accent: "#6366F1",
            },
          }}
        />
      </Portal>
    </>
  );
}

export default function TabsLayout() {
  return (
    <PaperProvider>
      <TabsContent />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    position: "relative",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  tabItem: {
    paddingTop: 8,
  },
  centerButtonContainer: {
    top: -15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  centerButton: {
    backgroundColor: "#6366F1",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  fab: {
    backgroundColor: "#6366F1",
  },
});
