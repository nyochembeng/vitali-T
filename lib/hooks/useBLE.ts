import { vitalsReceived } from "@/lib/features/ble/bleSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import { Device as AppDevice } from "@/lib/schemas/deviceSchema";
import { Vital } from "@/lib/schemas/vitalSchema";
import * as ExpoDevice from "expo-device";
import { useCallback, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from "react-native-base64";
import {
  Device as BleDevice,
  BleError,
  BleManager,
  Characteristic,
} from "react-native-ble-plx";
import { useDispatch } from "react-redux";

// BLE UUIDs for Vitali-T_Pro
const VITALI_T_SERVICE_UUID =
  process.env.BLE_SERVICE_UUID || "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const VITALI_T_VITALS_CHARACTERISTIC =
  process.env.BLE_CHARACTERISTIC_UUID || "beb5483e-36e1-4688-b7f5-ea07361b26a8";

// Map BleDevice to AppDevice
function mapBleDeviceToAppDevice(bleDevice: BleDevice): AppDevice {
  return {
    deviceId: bleDevice.id,
    model: "Vitali-T_Pro",
    firmwareVersion: "1.0.0",
    batteryLevel: 100,
    status: "ready",
    lastSyncTime: new Date().toISOString(),
    pairedTo: null,
    isConnected: false,
    rssi: bleDevice.rssi ?? null,
  };
}

// Interface for BLE vitals packet from ESP32
interface VitalsPacket {
  fhr: number; // Fetal heart rate (bpm)
  mhr: number; // Maternal heart rate (bpm)
  spo2: number; // SpO2 (%)
  bt: number; // Body temperature (°C)
  bp: string; // Blood pressure (e.g., "120/80", parsed as systolic number)
  hrv: number; // Heart rate variability (ms)
  si: number; // Shock index
  rr: string; // Respiratory rate (empty, parsed as 0)
  alert: boolean; // Alert status
}

// Interface for BLE API
interface BluetoothLowEnergyApi {
  requestPermissions: () => Promise<boolean>;
  scanForPeripherals: () => void;
  connectToDevice: (device: AppDevice) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: AppDevice | null;
  allDevices: AppDevice[];
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const dispatch = useDispatch();
  const [allDevices, setAllDevices] = useState<AppDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<AppDevice | null>(
    null
  );
  const { user } = useAuth();

  // Request Android BLE permissions
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Bluetooth Scan Permission",
        message: "Vitali-T requires Bluetooth scanning to discover devices.",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Bluetooth Connect Permission",
        message: "Vitali-T requires Bluetooth connection to communicate.",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires location access.",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires location access.",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    }
    return true; // iOS permissions are handled implicitly
  };

  // Check for duplicate devices
  const isDuplicateDevice = (devices: AppDevice[], nextDevice: AppDevice) =>
    devices.some((device) => nextDevice.deviceId === device.deviceId);

  // Scan for Vitali-T devices
  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("BLE scan error:", error);
        return;
      }
      if (device && device.name?.includes("Vitali-T")) {
        const appDevice = mapBleDeviceToAppDevice(device);
        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, appDevice)) {
            return [...prevState, appDevice];
          }
          return prevState;
        });
      }
    });
  };

  // Handle vitals data updates
  const onVitalsUpdate = useCallback(
    (error: BleError | null, characteristic: Characteristic | null) => {
      if (error) {
        console.error("Vitals update error:", error);
        return;
      }
      if (!characteristic?.value) {
        console.warn("No vitals data received");
        return;
      }

      try {
        // Decode base64 and parse JSON
        const rawData = base64.decode(characteristic.value);
        const vitalsPacket: VitalsPacket = JSON.parse(rawData);

        // Parse bp to extract systolic value as a number
        const bpValue = parseInt(vitalsPacket.bp.split("/")[0], 10) || 0;

        // Map to vitalSchema format
        const timestamp = new Date().toISOString();
        const userId = user?.userId || "user-id-placeholder";
        const deviceId = connectedDevice?.deviceId || "device-id-placeholder";
        const vitals: Vital[] = [
          {
            vitalId: `${timestamp}-fhr`,
            userId,
            deviceId,
            type: "fhr",
            value: vitalsPacket.fhr,
            unit: "bpm",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-mhr`,
            userId,
            deviceId,
            type: "mhr",
            value: vitalsPacket.mhr,
            unit: "bpm",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-spo2`,
            userId,
            deviceId,
            type: "spo2",
            value: vitalsPacket.spo2,
            unit: "%",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-bt`,
            userId,
            deviceId,
            type: "bt",
            value: vitalsPacket.bt,
            unit: "°C",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-bp`,
            userId,
            deviceId,
            type: "bp",
            value: bpValue,
            unit: "mmHg",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-hrv`,
            userId,
            deviceId,
            type: "hrv",
            value: vitalsPacket.hrv,
            unit: "ms",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-si`,
            userId,
            deviceId,
            type: "si",
            value: vitalsPacket.si,
            unit: "",
            status: vitalsPacket.alert ? "critical" : "normal",
            timestamp,
            hasChart: true,
          },
          {
            vitalId: `${timestamp}-rr`,
            userId,
            deviceId,
            type: "rr",
            value: 0, // Force 0 for graphing
            unit: "breaths/min",
            status: "normal",
            timestamp,
            hasChart: true,
          },
        ];

        // Dispatch to Redux for UI and backend sync
        dispatch(vitalsReceived({ vitals, timestamp }));
      } catch (parseError) {
        console.error("Failed to parse vitals data:", parseError);
      }
    },
    [dispatch, user, connectedDevice]
  );

  // Start streaming vitals data
  const startStreamingData = async (bleDevice: BleDevice) => {
    if (!bleDevice) {
      console.warn("No device provided for streaming");
      return;
    }
    try {
      await bleDevice.monitorCharacteristicForService(
        VITALI_T_SERVICE_UUID,
        VITALI_T_VITALS_CHARACTERISTIC,
        onVitalsUpdate
      );
    } catch (error) {
      console.error("Failed to start streaming:", error);
    }
  };

  // Connect to a device
  const connectToDevice = async (device: AppDevice) => {
    try {
      // Find the BLE device by deviceId
      const bleDevice = await bleManager
        .devices([device.deviceId])
        .then((devices) => devices[0]);
      if (!bleDevice) {
        console.error("BLE device not found for connection");
        return;
      }
      const deviceConnection = await bleManager.connectToDevice(bleDevice.id);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      setConnectedDevice({
        ...mapBleDeviceToAppDevice(deviceConnection),
        pairedTo: user?.userId ?? null, // Set pairedTo to current user id
        isConnected: true,
        status: "connected",
      });
      await startStreamingData(deviceConnection);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  // Disconnect from the device
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.deviceId);
      setConnectedDevice(null);
    }
  };

  return {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    allDevices,
  };
}

export default useBLE;
