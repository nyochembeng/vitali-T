import React, { useState } from "react";
import { View, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useTheme } from "@/lib/hooks/useTheme";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  style?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  style,
}) => {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShowPicker(Platform.OS === "ios");
    onChange(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      <TextInput
        label={label}
        value={value ? format(value, "MMM dd, yyyy") : ""}
        mode="outlined"
        editable={false}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={showDatePicker}
            color={colors.primary}
          />
        }
        onTouchStart={showDatePicker}
        style={{ backgroundColor: colors.card }}
        outlineStyle={{
          borderColor: colors.border,
          borderWidth: 1,
        }}
        activeOutlineColor={colors.primary}
      />

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
