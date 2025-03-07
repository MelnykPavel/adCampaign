// campaignValidation.ts
import { body, param } from 'express-validator';
import { VALIDATION_ERROR_MESSAGES as validationMessage } from '../constants';

export const validateCampaignId = param('id')
  .isInt()
  .withMessage(validationMessage.CAMPAIGN_ID_INVALID.code);

export const validateCreateCampaign = [
  body('title').isString().withMessage(validationMessage.TITLE_INVALID.code),
  body('landingPageUrl')
    .isURL()
    .withMessage(validationMessage.LANDING_PAGE_URL_INVALID.code),
  body('isRunning')
    .isBoolean()
    .withMessage(validationMessage.IS_RUNNING_INVALID.code),
];

export const validateUpdateCampaign = [
  validateCampaignId,
  body('title')
    .optional()
    .isString()
    .withMessage(validationMessage.TITLE_INVALID.code),
  body('landingPageUrl')
    .optional()
    .isURL()
    .withMessage(validationMessage.LANDING_PAGE_URL_INVALID.code),
  body('isRunning')
    .optional()
    .isBoolean()
    .withMessage(validationMessage.IS_RUNNING_INVALID.code),
  body('payouts')
    .optional()
    .isArray()
    .withMessage(validationMessage.PAYOUTS_INVALID.code)
    .custom((payouts: any[]) => {
      if (payouts && payouts.length > 0) {
        payouts.forEach((payout) => {
          if (typeof payout.id !== 'number') {
            throw new Error(validationMessage.PAYOUT_ID_INVALID.code);
          }
          if (typeof payout.campaignId !== 'number') {
            throw new Error(validationMessage.PAYOUT_CAMPAIGN_ID_INVALID.code);
          }
          if (typeof payout.country !== 'string') {
            throw new Error(validationMessage.PAYOUT_COUNTRY_INVALID.code);
          }
          if (typeof payout.amount !== 'number') {
            throw new Error(validationMessage.PAYOUT_AMOUNT_INVALID.code);
          }
        });
      }
      return true;
    }),
];

export const validateDeleteCampaign = [validateCampaignId];
