import { createCampaign } from './campaign/createCampaign';
import { deleteCampaignById } from './campaign/deleteCampaignById';
import { getAllCampaigns } from './campaign/getAllCampaign';
import { getCampaignById } from './campaign/getCampaignById';
import { updateCampaignById } from './campaign/updateCampaignById';

const campaign = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaignById,
  deleteCampaignById,
};

export { campaign };
