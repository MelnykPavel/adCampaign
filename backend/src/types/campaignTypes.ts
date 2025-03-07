import { Payout } from './payoutTypes';

type CommonCampaignKeys = {
  id: number;
  title: string;
};

export type RawCampaign = CommonCampaignKeys & {
  landing_page_url: string;
  is_running: boolean;
};

export type Campaign = CommonCampaignKeys & {
  landingPageUrl: string;
  isRunning: boolean;
  payouts?: Payout[];
};
