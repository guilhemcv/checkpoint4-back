const vinRouter = require('./vin');

const setupRoutes = (app) => {
  app.use('/vin', vinRouter);
};
module.exports = { setupRoutes };
