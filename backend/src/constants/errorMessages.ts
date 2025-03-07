import { ResponseMessage } from '../types';

const ERROR_MESSAGES: { [key: string]: ResponseMessage } = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
  },
  NOT_FOUND_ERROR: {
    message: 'Route not found',
    statusCode: 404,
    code: 'NOT_FOUND_ERROR',
  },
  CAMPAIGN_NOT_FOUND: {
    message: 'Campaign does not exist',
    statusCode: 404,
    code: 'CAMPAIGN_NOT_FOUND',
  },
  CAMPAIGN_CREATION_FAILED: {
    message: 'Failed to create campaign',
    statusCode: 500,
    code: 'CAMPAIGN_CREATION_FAILED',
  },
  CAMPAIGN_UPDATE_FAILED: {
    message: 'Failed to update campaign',
    statusCode: 500,
    code: 'CAMPAIGN_UPDATE_FAILED',
  },
  CAMPAIGN_DELETION_FAILED: {
    message: 'Failed to delete campaign',
    statusCode: 500,
    code: 'CAMPAIGN_DELETION_FAILED',
  },
  CAMPAIGNS_FETCH_FAILED: {
    message: 'Failed to fetch campaigns',
    statusCode: 500,
    code: 'CAMPAIGNS_FETCH_FAILED',
  },
  CAMPAIGN_FETCH_FAILED: {
    message: 'Failed to fetch campaign',
    statusCode: 500,
    code: 'CAMPAIGN_FETCH_FAILED',
  },
};

export default ERROR_MESSAGES;
