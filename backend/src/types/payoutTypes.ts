type CommonPayoutKeys = {
  id: number;
  country: string;
  amount: number;
};

export type RawPayout = CommonPayoutKeys & {
  campaign_id: number;
};

export type Payout = CommonPayoutKeys & {
  campaignId: number;
};
