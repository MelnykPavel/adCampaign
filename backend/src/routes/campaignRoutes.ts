import express, { Request, Response, NextFunction } from 'express';
import { campaign } from '../controllers';
import { validate } from '../middleware';
import {
  validateCampaignId,
  validateCreateCampaign,
  validateUpdateCampaign,
  validateDeleteCampaign,
} from './campaignValidation';

export const campaignRoutes = express.Router();

campaignRoutes.get('/', (req: Request, res: Response, next: NextFunction) =>
  campaign.getAllCampaigns(req, res, next)
);

campaignRoutes.get(
  '/:id',
  validateCampaignId,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    campaign.getCampaignById(req, res, next)
);

campaignRoutes.post(
  '/',
  validateCreateCampaign,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    campaign.createCampaign(req, res, next)
);

campaignRoutes.put(
  '/:id',
  validateUpdateCampaign,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    campaign.updateCampaignById(req, res, next)
);

campaignRoutes.delete(
  '/:id',
  validateDeleteCampaign, // используем валидацию для удаления кампании
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    campaign.deleteCampaignById(req, res, next)
);
