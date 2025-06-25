import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BleState, VitalsReceivedPayload } from "./bleTypes";
import vitalsApi from "@/lib/features/vitals/vitalsService";
import { Device } from "@/lib/schemas/deviceSchema";

const initialState: BleState = {
  isScanning: false,
  devices: [],
  connectedDeviceId: null,
  latestVitals: null,
  lastSyncTime: null,
};

const bleSlice = createSlice({
  name: "ble",
  initialState,
  reducers: {
    scanStarted(state) {
      state.isScanning = true;
      state.devices = []; // Clear previous devices
    },
    scanStopped(state) {
      state.isScanning = false;
    },
    deviceFound(state, action: PayloadAction<Device>) {
      const existingIndex = state.devices.findIndex(
        (device) => device.deviceId === action.payload.deviceId
      );
      if (existingIndex === -1) {
        state.devices.push(action.payload);
      } else {
        state.devices[existingIndex] = action.payload; // Update existing device
      }
    },
    connected(state, action: PayloadAction<string>) {
      state.connectedDeviceId = action.payload;
      state.isScanning = false;
    },
    disconnected(state) {
      state.connectedDeviceId = null;
      state.latestVitals = null;
      state.lastSyncTime = null;
    },
    vitalsReceived(state, action: PayloadAction<VitalsReceivedPayload>) {
      state.latestVitals = action.payload.vitals;
      state.lastSyncTime = action.payload.timestamp;
    },
  },
  extraReducers: (builder) => {
    // Handle vitalsReceived to trigger backend sync
    builder.addCase(
      bleSlice.actions.vitalsReceived,
      (state, action: PayloadAction<VitalsReceivedPayload>) => {
        const { vitals } = action.payload;
        // Trigger backend sync for each vital
        vitals.forEach((vital) => {
          vitalsApi.endpoints.createVital.initiate({
            userId: vital.userId,
            deviceId: vital.deviceId,
            type: vital.type,
            value: vital.value,
            unit: vital.unit,
            status: vital.status,
            timestamp: vital.timestamp,
            hasChart: vital.hasChart,
          });
        });
      }
    );
  },
});

export const {
  scanStarted,
  scanStopped,
  deviceFound,
  connected,
  disconnected,
  vitalsReceived,
} = bleSlice.actions;

export default bleSlice.reducer;
