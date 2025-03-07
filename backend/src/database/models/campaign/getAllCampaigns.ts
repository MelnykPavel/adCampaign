import { db } from '../../../database';
import { Campaign } from '../../../types';

interface GetAllCampaignsParams {
  search?: string;
  filter?: string;
}

export const getAllCampaigns = ({
  search = '',
  filter = 'all',
}: GetAllCampaignsParams = {}): Promise<Campaign[]> => {
  const baseQuery = `
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
  `;

  const conditions: string[] = [];
  const params: any[] = [];

  if (search && search.trim() !== '') {
    conditions.push('(c.title LIKE ? OR c.landing_page_url LIKE ?)');
    const searchValue = `%${search.trim()}%`;
    params.push(searchValue, searchValue);
  }

  if (filter && filter !== 'all') {
    if (filter === 'running') {
      conditions.push('c.is_running = 1');
    } else if (filter === 'stopped') {
      conditions.push('c.is_running = 0');
    }
  }

  let query = baseQuery;
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  return new Promise((resolve, reject) => {
    db.all(query, params, (err: Error | null, rows?: any[]) => {
      if (err) {
        reject(err);
        return;
      }

      if (!rows || rows.length === 0) {
        resolve([]);
        return;
      }

      const campaignsMap: { [key: number]: Campaign } = {};

      rows.forEach((row) => {
        if (!campaignsMap[row.campaignId]) {
          campaignsMap[row.campaignId] = {
            id: row.campaignId,
            title: row.title,
            landingPageUrl: row.landing_page_url,
            isRunning: Boolean(row.is_running),
            payouts: [],
          };
        }

        if (row.payoutId) {
          campaignsMap[row.campaignId].payouts!.push({
            id: row.payoutId,
            campaignId: row.campaignId,
            country: row.country,
            amount: row.amount,
          });
        }
      });

      resolve(Object.values(campaignsMap));
    });
  });
};
