import { NextFunction, Request, Response } from 'express';
import { models } from '../../database';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import { enhanceError } from '../../utils';
import { Campaign, Payout } from '../../types';

const msg = {
  success: SUCCESS_MESSAGES.CAMPAIGN_CREATED,
  error: ERROR_MESSAGES.CAMPAIGN_CREATION_FAILED,
};

export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, landingPageUrl, isRunning, payouts } = req.body;

    const campaignData: Omit<Campaign, 'id'> = {
      title,
      landingPageUrl,
      isRunning,
    };
    const createdCampaign = await models.campaign.createCampaign(campaignData);

    let createdPayouts: Payout[] = [];
    if (payouts && Array.isArray(payouts)) {
      const payoutsWithCampaignId = payouts.map((payout: Payout) => ({
        ...payout,
        campaignId: createdCampaign.id,
      }));

      createdPayouts = await Promise.all(
        payoutsWithCampaignId.map((payout) =>
          models.payout.createPayout(payout)
        )
      );
    }

    createdCampaign.payouts = createdPayouts;

    res
      .status(msg.success.statusCode)
      .json({ message: msg.success.message, data: createdCampaign });
  } catch (error) {
    next(enhanceError(error, msg.error.code));
  }
};
