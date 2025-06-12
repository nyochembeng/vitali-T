import React, { useState } from "react";
import { View, Share, Alert, Text } from "react-native";
import { Appbar, Menu, Badge } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

interface CustomAppBarProps {
  title: string;
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
  isHome = false,
  rightAction,
  shareData,
  onInfoPress,
  hasUnreadNotifications = false,
  moreMenuItems = [],
}) => {
  const { colors, typo, layout } = useTheme();
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
    return (
      <Text
        style={{
          ...typo.subtitle1,
          color: colors.text,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    );
  };

  const renderLeftAction = () => {
    if (isHome) {
      return (
        <Appbar.Action
          icon="account-circle"
          onPress={handleProfile}
          iconColor={colors.text}
        />
      );
    }
    return <Appbar.BackAction onPress={handleBack} iconColor={colors.text} />;
  };

  const renderRightAction = () => {
    if (isHome) {
      return (
        <Appbar.Action
          icon="cog"
          onPress={handleSettings}
          iconColor={colors.text}
        />
      );
    }

    switch (rightAction) {
      case "share":
        return (
          <Appbar.Action
            icon="share"
            onPress={handleShare}
            iconColor={colors.text}
          />
        );
      case "info":
        return (
          <Appbar.Action
            icon="information"
            onPress={onInfoPress}
            iconColor={colors.text}
          />
        );
      case "notifications":
        return (
          <View
            style={{
              position: "relative",
            }}
          >
            <Appbar.Action
              icon="bell"
              onPress={handleNotifications}
              iconColor={colors.text}
            />
            {hasUnreadNotifications && (
              <Badge
                size={layout.spacing.sm}
                style={{
                  position: "absolute",
                  top: layout.spacing.xs,
                  right: layout.spacing.xs,
                  backgroundColor: colors.error,
                }}
              />
            )}
          </View>
        );
      case "help":
        return (
          <Appbar.Action
            icon="help-circle"
            onPress={handleHelp}
            iconColor={colors.text}
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
                iconColor={colors.text}
              />
            }
            contentStyle={{
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.medium,
              elevation: layout.elevation,
              shadowColor: colors.border,
              shadowOffset: { width: 0, height: layout.spacing.xs },
              shadowOpacity: 0.15,
              shadowRadius: layout.spacing.sm,
            }}
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
                titleStyle={{
                  ...typo.body2,
                  color: colors.text,
                }}
              />
            ))}
          </Menu>
        );
      default:
        return null;
    }
  };

  return (
    <Appbar.Header
      style={{
        backgroundColor: colors.background,
        elevation: layout.elevation,
        shadowColor: colors.border,
        shadowOffset: { width: 0, height: layout.spacing.xs },
        shadowOpacity: 0.1,
        shadowRadius: layout.spacing.sm,
      }}
    >
      {renderLeftAction()}
      <Appbar.Content title={renderTitle()} />
      {renderRightAction()}
    </Appbar.Header>
  );
};

export default CustomAppBar;
