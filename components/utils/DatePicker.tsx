import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

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
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value ? format(value, "MMM dd, yyyy") : ""}
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#B8860B"
        editable={false}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={showDatePicker}
            color="#B8860B"
          />
        }
        onTouchStart={showDatePicker}
        style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
});

export default DatePicker;
