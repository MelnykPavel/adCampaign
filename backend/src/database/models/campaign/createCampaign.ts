import { db } from '../../../database';
import { Campaign, RawCampaign } from '../../../types';

export const createCampaign = (
  campaign: Omit<Campaign, 'id'>
): Promise<Campaign> => {
  const rawCampaign: Omit<RawCampaign, 'id'> = {
    title: campaign.title,
    landing_page_url: campaign.landingPageUrl,
    is_running: campaign.isRunning,
  };

  const query = `
    INSERT INTO campaigns (title, landing_page_url, is_running)
    VALUES (?, ?, ?)
  `;
  const params = [
    rawCampaign.title,
    rawCampaign.landing_page_url,
    rawCampaign.is_running,
  ];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
        return;
      }

      const createdCampaign: Campaign = {
        id: this.lastID,
        title: campaign.title,
        landingPageUrl: campaign.landingPageUrl,
        isRunning: campaign.isRunning,
      };

      resolve(createdCampaign);
    });
  });
};
