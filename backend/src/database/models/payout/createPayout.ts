import { db } from '../../../database';
import { Payout, RawPayout } from '../../../types/payoutTypes';

export const createPayout = (payout: Payout): Promise<Payout> => {
  const rawPayout: Omit<RawPayout, 'id'> = {
    campaign_id: payout.campaignId,
    country: payout.country,
    amount: payout.amount,
  };

  const query = `
    INSERT INTO payouts (campaign_id, country, amount)
    VALUES (?, ?, ?)
  `;
  const params = [rawPayout.campaign_id, rawPayout.country, rawPayout.amount];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
        return;
      }

      const createdPayout: Payout = {
        id: this.lastID,
        campaignId: payout.campaignId,
        country: payout.country,
        amount: payout.amount,
      };

      resolve(createdPayout);
    });
  });
};
