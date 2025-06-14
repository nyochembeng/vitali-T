import { z } from "zod";
import { userSchema } from "./userSchema";

export const deviceSchema = z.object({
  deviceId: z
    .string()
    .min(1, { message: "Device ID is required" })
    .regex(/^VT-\d+$/, {
      message: "Device ID must follow format VT- followed by numbers",
    }),
  model: z
    .string()
    .min(1, { message: "Model is required" })
    .max(50, { message: "Model must not exceed 50 characters" }),
  firmwareVersion: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: "Firmware version must be in format X.Y.Z",
  }),
  batteryLevel: z
    .number()
    .int()
    .min(0, { message: "Battery level must be at least 0" })
    .max(100, { message: "Battery level must not exceed 100" }),
  status: z.enum(["ready", "connecting", "connected", "disconnected"], {
    message: "Invalid status",
  }),
  lastSyncTime: z
    .string()
    .datetime({ message: "Last sync time must be a valid ISO 8601 datetime" }),
  pairedTo: userSchema.shape.userId.nullable(),
  isConnected: z.boolean(),
  rssi: z
    .number()
    .int()
    .min(-100, { message: "RSSI must be at least -100 dBm" })
    .max(0, { message: "RSSI must not exceed 0 dBm" })
    .nullable()
    .optional(),
});

export type Device = z.infer<typeof deviceSchema>;
