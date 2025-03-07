export type Payout = {
  id: number;
  campaignId: number;
  country: string;
  amount: number;
};

export type Campaign = {
  id: number;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  payouts?: Payout[];
};
export type FormMode = 'create' | 'edit' | 'view';
