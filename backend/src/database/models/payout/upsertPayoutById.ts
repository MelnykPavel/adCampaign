import { db } from '../../../database';
import { Payout, RawPayout } from '../../../types';

export const upsertPayout = (
  updatedPayout: Omit<Payout, 'id'>
): Promise<Payout> => {
  const upsertQuery = `
    INSERT INTO payouts (campaign_id, country, amount)
    VALUES (?, ?, ?)
    ON CONFLICT (campaign_id, country)
    DO UPDATE SET
      amount = excluded.amount
    RETURNING id, campaign_id, country, amount;
  `;

  const params = [
    updatedPayout.campaignId,
    updatedPayout.country,
    updatedPayout.amount,
  ];

  return new Promise((resolve, reject) => {
    db.get(upsertQuery, params, (err, row: RawPayout) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        reject(new Error('Failed to insert or update payout'));
        return;
      }

      const result: Payout = {
        id: row.id,
        campaignId: row.campaign_id,
        country: row.country,
        amount: row.amount,
      };
      resolve(result);
    });
  });
};
