import { NextFunction, Request, Response } from 'express';
import { models } from '../../database';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../constants';
import { enhanceError } from '../../utils';
const msg = {
  success: SUCCESS_MESSAGES.CAMPAIGN_DELETED,
  error: ERROR_MESSAGES.CAMPAIGN_DELETION_FAILED,
  notFound: ERROR_MESSAGES.CAMPAIGN_NOT_FOUND,
};

export const deleteCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const campaignId = parseInt(id, 10);

    const isExist = await models.campaign.getCampaignById(campaignId);

    if (!isExist) throw new Error(msg.notFound.code);

    await models.campaign.deleteCampaignById(campaignId);
    res
      .status(msg.success.statusCode)
      .json({ message: msg.success.message, data: { id: campaignId } });
  } catch (error) {
    next(enhanceError(error, msg.error.code));
  }
};
