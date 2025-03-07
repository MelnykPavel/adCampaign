import { createCampaign } from './campaign/createCampaign';
import { deleteCampaignById } from './campaign/deleteCampaignById';
import { getAllCampaigns } from './campaign/getAllCampaigns';
import { getCampaignById } from './campaign/getCampaignById';
import { updateCampaignById } from './campaign/updateCampaignById';
import { createPayout } from './payout/createPayout';
import { upsertPayout } from './payout/upsertPayoutById';
import { deletePayoutsById } from './payout/deletePayoutById';

export default {
  campaign: {
    createCampaign,
    deleteCampaignById,
    getAllCampaigns,
    getCampaignById,
    updateCampaignById,
  },
  payout: {
    createPayout,
    upsertPayout,
    deletePayoutsById,
  },
};
