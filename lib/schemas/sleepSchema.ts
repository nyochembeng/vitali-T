import { deviceSchema } from '@/lib/schemas/deviceSchema';
import { userSchema } from '@/lib/schemas/userSchema';
import { z } from 'zod';

export const sleepSchema = z.object({
  sleepId: z.string().min(1, { message: 'Sleep ID is required' }),
  userId: userSchema.shape.userId,
  deviceId: deviceSchema.shape.deviceId,
  sleepStart: z.string().min(1, { message: 'Sleep start time is required' }),
  wakeTime: z.string().min(1, { message: 'Wake time is required' }),
  totalDuration: z.string().min(1, { message: 'Total duration is required' }),
  quality: z.enum(['Very Poor', 'Poor', 'Okay', 'Good', 'Excellent']).optional(),
  notes: z.string().optional(),
  hadNap: z.boolean(),
  interruptedSleep: z.boolean(),
  timestamp: z.string().datetime({ message: 'Timestamp must be a valid ISO 8601 datetime' }),
});

export type Sleep = z.infer<typeof sleepSchema>;