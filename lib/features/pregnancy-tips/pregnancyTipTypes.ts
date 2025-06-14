import { PregnancyTip } from "@/lib/schemas/pregnancyTipSchema";

export interface PregnancyTipResponse {
  tip: PregnancyTip;
}

export interface PregnancyTipsResponse {
  tips: PregnancyTip[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PregnancyTipFilterParams {
  category?: string;
  week?: number;
  trimester?: string;
  keywords?: string[];
}
