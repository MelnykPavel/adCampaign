import express from 'express';
import { campaignRoutes } from './campaignRoutes.js';

const routes = express.Router();

routes.use('/campaign', campaignRoutes);

export { routes };
