import { ResponseMessage } from '../types';

const VALIDATION_ERROR_MESSAGES: { [key: string]: ResponseMessage } = {
  CAMPAIGN_ID_INVALID: {
    message: 'Campaign ID must be an integer',
    statusCode: 400,
    code: 'CAMPAIGN_ID_INVALID',
  },
  TITLE_INVALID: {
    message: 'Title must be a string',
    statusCode: 400,
    code: 'TITLE_INVALID',
  },
  LANDING_PAGE_URL_INVALID: {
    message: 'Landing Page URL must be a valid URL',
    statusCode: 400,
    code: 'LANDING_PAGE_URL_INVALID',
  },
  IS_RUNNING_INVALID: {
    message: 'isRunning must be a boolean',
    statusCode: 400,
    code: 'IS_RUNNING_INVALID',
  },

  PAYOUTS_INVALID: {
    message: 'Payouts must be an array',
    statusCode: 400,
    code: 'PAYOUTS_INVALID',
  },
  PAYOUT_ID_INVALID: {
    message: 'Payout ID must be an integer',
    statusCode: 400,
    code: 'PAYOUT_ID_INVALID',
  },
  PAYOUT_CAMPAIGN_ID_INVALID: {
    message: 'Payout campaign ID must be an integer',
    statusCode: 400,
    code: 'PAYOUT_CAMPAIGN_ID_INVALID',
  },
  PAYOUT_COUNTRY_INVALID: {
    message: 'Payout country must be a string',
    statusCode: 400,
    code: 'PAYOUT_COUNTRY_INVALID',
  },
  PAYOUT_AMOUNT_INVALID: {
    message: 'Payout amount must be a number',
    statusCode: 400,
    code: 'PAYOUT_AMOUNT_INVALID',
  },
};

export default VALIDATION_ERROR_MESSAGES;
