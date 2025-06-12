import React, { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { FAB, Portal, Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface TabIconProps {
  name: string;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, size = 24 }) => {
  const { colors } = useTheme();
  const iconColor = focused ? colors.primary : "rgba(17, 12, 9, 0.6)";

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
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
          shadowColor: colors.border,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderWidth: 3,
          borderColor: colors.background,
        }}
      >
        <MaterialIcons name="add" size={28} color={colors.textInverse} />
      </View>
    </TouchableOpacity>
  );
};

function TabsContent() {
  const [fabOpen, setFabOpen] = useState(false);
  const router = useRouter();
  const { colors, layout, typo } = useTheme();

  const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open);

  const handleCenterButtonPress = () => {
    setFabOpen(!fabOpen);
  };

  const fabActions = [
    {
      icon: "heart-pulse",
      label: "Uterine Contractions",
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
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 80,
            paddingBottom: layout.spacing.sm,
            paddingTop: layout.spacing.xs,
            position: "relative",
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "rgba(17, 12, 9, 0.6)",
          tabBarLabelStyle: {
            fontSize: typo.body3.fontSize,
            fontWeight: "500",
            marginTop: layout.spacing.xs,
            ...typo.body3,
          },
          tabBarItemStyle: {
            paddingTop: layout.spacing.sm,
          },
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
          fabStyle={{ display: "none" }} // Hide the default FAB since we're using custom button
          theme={{
            colors: {
              primary: colors.primary,
              accent: colors.primary,
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
