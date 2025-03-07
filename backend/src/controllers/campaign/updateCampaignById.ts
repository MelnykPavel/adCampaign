import { NextFunction, Request, Response } from 'express';
import { models } from '../../database';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import { enhanceError } from '../../utils';
import { Payout } from '../../types';

const msg = {
  success: SUCCESS_MESSAGES.CAMPAIGN_UPDATED,
  error: ERROR_MESSAGES.CAMPAIGN_UPDATE_FAILED,
  notFound: ERROR_MESSAGES.CAMPAIGN_NOT_FOUND,
};

export const updateCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const campaignId = parseInt(id, 10);
    const payouts: Payout[] = req.body.payouts;

    const isExist = await models.campaign.getCampaignById(campaignId);
    if (!isExist) throw new Error(msg.notFound.code);

    if (isExist.payouts) {
      const payloadIds = new Set(payouts.map((p) => `${p.id}-${p.campaignId}`));
      const payoutsToDelete = isExist.payouts.filter(
        (payout) => !payloadIds.has(`${payout.id}-${payout.campaignId}`)
      );
      console.log(`payouts`, payouts);

      await Promise.all([
        ...payoutsToDelete.map((payout) =>
          models.payout.deletePayoutsById(payout.id)
        ),
        ...payouts.map((payout) => models.payout.upsertPayout(payout)),
      ]);
    }

    const updatedCampaign = await models.campaign.updateCampaignById(
      campaignId,
      req.body
    );

    res
      .status(msg.success.statusCode)
      .json({ message: msg.success.message, data: updatedCampaign });
  } catch (error) {
    next(enhanceError(error, msg.error.code));
  }
};
