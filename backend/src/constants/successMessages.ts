import { ResponseMessage } from '../types';

const SUCCESS_MESSAGES: { [key: string]: ResponseMessage } = {
  CAMPAIGN_CREATED: {
    message: 'Campaign created successfully',
    statusCode: 201,
    code: 'CAMPAIGN_CREATED',
  },
  CAMPAIGN_DELETED: {
    message: 'Campaign deleted successfully',
    statusCode: 200,
    code: 'CAMPAIGN_DELETED',
  },
  CAMPAIGNS_FETCHED: {
    message: 'Campaigns fetched successfully',
    statusCode: 200,
    code: 'CAMPAIGNS_FETCHED',
  },
  CAMPAIGN_FETCHED: {
    message: 'Campaign fetched successfully',
    statusCode: 200,
    code: 'CAMPAIGN_FETCHED',
  },
  CAMPAIGN_UPDATED: {
    message: 'Campaign updated successfully',
    statusCode: 200,
    code: 'CAMPAIGN_UPDATED',
  },
};

export default SUCCESS_MESSAGES;
