const Arena = require('bull-arena');
const eventRegisterRoutes = require('./src/eventRegister/routes');
const eventValidationRoutes = require('./src/eventValidation/routes');

module.exports = (app, port, queues) => {
  const arenaConfig = Arena(
    {
      queues,
    },
    {
      basePath: '/arena',
      disableListen: true,
    }
  );

  app.use('/', arenaConfig);
  eventRegisterRoutes(app);
  eventValidationRoutes(app);

  app.listen(port, () => {
    console.log('Server on port', port);
  });
};
