import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SettingsItem } from './SettingsItem';

interface SettingsItemType {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
  showChevron?: boolean;
}

interface SettingsSectionType {
  id: string;
  title?: string;
  items: SettingsItemType[];
}
interface SettingsSectionProps {
  section: SettingsSectionType;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ section }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {section.title && (
        <Text variant="labelLarge" style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}>
          {section.title}
        </Text>
      )}
      {section.items.map((item) => (
        <SettingsItem key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 32,
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});