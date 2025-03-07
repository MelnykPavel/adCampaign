import { NextFunction, Request, Response } from 'express';
import { models } from '../../database';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import { enhanceError } from '../../utils';

const msg = {
  success: SUCCESS_MESSAGES.CAMPAIGNS_FETCHED,
  error: ERROR_MESSAGES.CAMPAIGNS_FETCH_FAILED,
};

export const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = '', filter = 'all' } = req.query;
    const searchParam = String(search);
    const filterParam = String(filter);

    const campaigns = await models.campaign.getAllCampaigns({
      search: searchParam,
      filter: filterParam,
    });
    res
      .status(msg.success.statusCode)
      .json({ message: msg.success.message, data: campaigns });
  } catch (error) {
    next(enhanceError(error, msg.error.code));
  }
};
