import React, { useState } from "react";
import { View, StyleSheet, Share, Alert } from "react-native";
import { Appbar, Menu, Badge } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CustomAppBarProps {
  title: string;
  titleIcon?: {
    name: string;
    position: "left" | "right";
  };
  isHome?: boolean;
  rightAction?: "share" | "info" | "notifications" | "more" | "help";
  shareData?: {
    message: string;
    url?: string;
    title?: string;
  };
  onInfoPress?: () => void;
  hasUnreadNotifications?: boolean;
  moreMenuItems?: {
    title: string;
    icon: string;
    onPress: () => void;
  }[];
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({
  title,
  titleIcon,
  isHome = false,
  rightAction,
  shareData,
  onInfoPress,
  hasUnreadNotifications = false,
  moreMenuItems = [],
}) => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleShare = async () => {
    if (!shareData) return;

    try {
      await Share.share({
        message: shareData.message,
        url: shareData.url,
        title: shareData.title,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share content: " + error);
    }
  };

  const handleNotifications = () => {
    router.push("/notifications");
  };

  const handleHelp = () => {
    router.push("/help");
  };

  const renderTitle = () => {
    if (!titleIcon) {
      return title;
    }

    return (
      <View style={styles.titleContainer}>
        {titleIcon.position === "left" && (
          <MaterialIcons
            name={titleIcon.name as any}
            size={20}
            color="#374151"
            style={styles.titleIconLeft}
          />
        )}
        {title}
        {titleIcon.position === "right" && (
          <MaterialIcons
            name={titleIcon.name as any}
            size={20}
            color="#374151"
            style={styles.titleIconRight}
          />
        )}
      </View>
    );
  };

  const renderLeftAction = () => {
    if (isHome) {
      return (
        <Appbar.Action
          icon="account-circle"
          onPress={handleProfile}
          iconColor="#374151"
        />
      );
    }
    return <Appbar.BackAction onPress={handleBack} iconColor="#374151" />;
  };

  const renderRightAction = () => {
    if (isHome) {
      return (
        <Appbar.Action
          icon="cog"
          onPress={handleSettings}
          iconColor="#374151"
        />
      );
    }

    switch (rightAction) {
      case "share":
        return (
          <Appbar.Action
            icon="share"
            onPress={handleShare}
            iconColor="#374151"
          />
        );
      case "info":
        return (
          <Appbar.Action
            icon="information"
            onPress={onInfoPress}
            iconColor="#374151"
          />
        );
      case "notifications":
        return (
          <View style={styles.notificationContainer}>
            <Appbar.Action
              icon="bell"
              onPress={handleNotifications}
              iconColor="#374151"
            />
            {hasUnreadNotifications && (
              <Badge size={8} style={styles.notificationBadge} />
            )}
          </View>
        );
      case "help":
        return (
          <Appbar.Action
            icon="help-circle"
            onPress={handleHelp}
            iconColor="#374151"
          />
        );
      case "more":
        return (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={() => setMenuVisible(true)}
                iconColor="#374151"
              />
            }
            contentStyle={styles.menuContent}
          >
            {moreMenuItems.map((item, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  item.onPress();
                  setMenuVisible(false);
                }}
                title={item.title}
                leadingIcon={item.icon}
                titleStyle={styles.menuItemTitle}
              />
            ))}
          </Menu>
        );
      default:
        return null;
    }
  };

  return (
    <Appbar.Header style={styles.appBar}>
      {renderLeftAction()}
      <Appbar.Content title={renderTitle() as any} titleStyle={styles.title} />
      {renderRightAction()}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleIconLeft: {
    marginRight: 8,
  },
  titleIconRight: {
    marginLeft: 8,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#EF4444",
  },
  menuContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#374151",
  },
});

export default CustomAppBar;
