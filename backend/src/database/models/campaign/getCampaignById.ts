import { db } from '../../../database';
import { Campaign } from '../../../types';

export const getCampaignById = (id: number): Promise<Campaign | null> => {
  const query = `
    SELECT 
      c.id AS campaignId,
      c.title,
      c.landing_page_url,
      c.is_running,
      p.id AS payoutId,
      p.country,
      p.amount
    FROM campaigns c
    LEFT JOIN payouts p ON c.id = p.campaign_id
    WHERE c.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [id], (err: Error | null, rows?: any[]) => {
      if (err) {
        reject(err);
        return;
      }

      if (rows && rows.length > 0) {
        const campaign: Campaign = {
          id: rows[0].campaignId,
          title: rows[0].title,
          landingPageUrl: rows[0].landing_page_url,
          isRunning: Boolean(rows[0].is_running),
          payouts: [],
        };
        rows.forEach((row) => {
          if (row.payoutId) {
            campaign.payouts!.push({
              id: row.payoutId,
              campaignId: row.campaignId,
              country: row.country,
              amount: row.amount,
            });
          }
        });

        resolve(campaign);
      } else {
        resolve(null);
      }
    });
  });
};
