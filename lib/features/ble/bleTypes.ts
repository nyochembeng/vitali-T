import { Device } from "@/lib/schemas/deviceSchema";
import { Vital } from "@/lib/schemas/vitalSchema";

// Interface for the raw vitals packet from the Vitali-T_Pro device
export interface VitalsPacket {
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

// Interface for the BLE state in Redux
export interface BleState {
  isScanning: boolean;
  devices: Device[];
  connectedDeviceId: string | null;
  latestVitals: Vital[] | null;
  lastSyncTime: string | null; // ISO 8601 timestamp
}

// Type for vitalsReceived action payload
export interface VitalsReceivedPayload {
  vitals: Vital[];
  timestamp: string; // ISO 8601 timestamp
}
