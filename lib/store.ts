import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { profileSlice } from "./features/profile/profileSlice";
import { settingsSlice } from "./features/settings/settingsSlice";
import { vitalsSlice } from "./features/vitals/vitalsSlice";
import { symptomsSlice } from "./features/symptoms/symptomsSlice";
import { sleepSlice } from "./features/sleep/sleepSlice";
import { fetalMovementSlice } from "./features/fetal-movements/fetalMovementsSlice";
import { contractionSlice } from "./features/contractions/contractionsSlice";
import { activitySlice } from "./features/activity/activitySlice";
import { notificationSlice } from "./features/notifications/notificationsSlice";
import { alertSlice } from "./features/alerts/alertSlice";
import { insightsSlice } from "./features/insights/insightsSlice";
import { educationSlice } from "./features/education/educationSlice";
import { vitalSignEducationSlice } from "./features/vitals-education/vitalSignEducationSlice";
import { pregnancyTipSlice } from "./features/pregnancy-tips/pregnancyTipSlice";
import { emergencySymptomSlice } from "./features/emergency-symptoms/emergencySymptomSlice";
import bleSlice from "./features/ble/bleSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [profileSlice.reducerPath]: profileSlice.reducer,
    [settingsSlice.reducerPath]: settingsSlice.reducer,
    [vitalsSlice.reducerPath]: vitalsSlice.reducer,
    [symptomsSlice.reducerPath]: symptomsSlice.reducer,
    [sleepSlice.reducerPath]: sleepSlice.reducer,
    [fetalMovementSlice.reducerPath]: fetalMovementSlice.reducer,
    [contractionSlice.reducerPath]: contractionSlice.reducer,
    [activitySlice.reducerPath]: activitySlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [alertSlice.reducerPath]: alertSlice.reducer,
    [insightsSlice.reducerPath]: insightsSlice.reducer,
    [educationSlice.reducerPath]: educationSlice.reducer,
    [vitalSignEducationSlice.reducerPath]: vitalSignEducationSlice.reducer,
    [pregnancyTipSlice.reducerPath]: pregnancyTipSlice.reducer,
    [emergencySymptomSlice.reducerPath]: emergencySymptomSlice.reducer,
    ble: bleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      profileSlice.middleware,
      settingsSlice.middleware,
      vitalsSlice.middleware,
      symptomsSlice.middleware,
      sleepSlice.middleware,
      fetalMovementSlice.middleware,
      contractionSlice.middleware,
      activitySlice.middleware,
      notificationSlice.middleware,
      alertSlice.middleware,
      insightsSlice.middleware,
      educationSlice.middleware,
      vitalSignEducationSlice.middleware,
      pregnancyTipSlice.middleware,
      emergencySymptomSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
