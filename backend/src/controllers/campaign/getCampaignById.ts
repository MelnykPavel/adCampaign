import { NextFunction, Request, Response } from 'express';
import { models } from '../../database';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import { enhanceError } from '../../utils';

const msg = {
  success: SUCCESS_MESSAGES.CAMPAIGN_FETCHED,
  error: ERROR_MESSAGES.CAMPAIGN_FETCH_FAILED,
  notFound: ERROR_MESSAGES.CAMPAIGN_NOT_FOUND,
};

export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const campaignId = parseInt(id, 10);

    const campaign = await models.campaign.getCampaignById(campaignId);

    if (!campaign) throw new Error(msg.notFound.code);

    res
      .status(msg.success.statusCode)
      .json({ message: msg.success.message, data: campaign });
  } catch (error) {
    next(enhanceError(error, msg.error.code));
  }
};
