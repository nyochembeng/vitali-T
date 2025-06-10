import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PrivacySectionItemProps {
  section: PrivacySection;
  expanded?: boolean;
  onToggle?: () => void;
}

export const PrivacySectionItem: React.FC<PrivacySectionItemProps> = ({
  section,
  expanded = false,
  onToggle,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.sectionContainer,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <List.Accordion
        title={section.title}
        description={section.description}
        expanded={expanded}
        onPress={onToggle}
        left={(props) => (
          <MaterialCommunityIcons
            name={section.icon as any}
            size={24}
            color="#B8860B"
            style={styles.icon}
          />
        )}
        right={(props) => (
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#B8860B"
          />
        )}
        titleStyle={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        descriptionStyle={[
          styles.sectionDescription,
          { color: theme.colors.onSurfaceVariant },
        ]}
        style={styles.accordion}
      >
        <Text
          style={[
            styles.expandedContent,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          {section.description}
        </Text>
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  accordion: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  expandedContent: {
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
  },
});
