const {Router} = require('express');
const { healthCheck } = require('../controllers/healthCheck.controllers.js');

const healthCheckRouter = Router();

healthCheckRouter.get("/health", healthCheck);

module.exports = healthCheckRouter;