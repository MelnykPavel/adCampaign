import { db } from '../../../database';
import { Campaign, RawCampaign } from '../../../types';

export const updateCampaignById = (
  id: number,
  updatedCampaign: Campaign
): Promise<Campaign> => {
  const rawCampaign: Omit<RawCampaign, 'id'> = {
    title: updatedCampaign.title,
    landing_page_url: updatedCampaign.landingPageUrl,
    is_running: updatedCampaign.isRunning,
  };

  const updateQuery = `
    UPDATE campaigns 
    SET title = ?, landing_page_url = ?, is_running = ?
    WHERE id = ?
  `;
  const params = [
    rawCampaign.title,
    rawCampaign.landing_page_url,
    rawCampaign.is_running,
    id,
  ];

  return new Promise((resolve, reject) => {
    db.run(updateQuery, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      const updated: Campaign = {
        id,
        title: rawCampaign.title,
        landingPageUrl: rawCampaign.landing_page_url,
        isRunning: rawCampaign.is_running,
      };
      resolve(updated);
    });
  });
};
