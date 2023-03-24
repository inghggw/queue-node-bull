const {
  config: { redis },
} = require('./config');
const { eventRegister: eventRegisterWorker, eventValidation: eventValidationWorker } = require('./workers');
const Queue = require('bull');

//Ejecutar maximo 2 colas cada 10 segundos
const eventRegister = new Queue('event-register', {
  redis,
  limiter: {
    max: 2,
    duration: 10000
  }
});

// Ejecutar maximo 5 colas cada 5 segundos
const eventValidation = new Queue('event-validation', {
  redis,
  limiter: {
    max: 5,
    duration: 5000
  }
});

// Enlazar las queue con los worker
eventRegister.process((job, done) => eventRegisterWorker(job, done));
eventValidation.process((job, done) => eventValidationWorker(job, done));

// Definición de las colas que se esperan
const queues = [
  {
    name: 'event-register',
    hostId: 'Events Queue Manager',
    redis,
  },
  {
    name: 'event-validation',
    hostId: 'Events Queue Manager',
    redis,
  },
];

module.exports = { eventRegister, eventValidation, queues };
