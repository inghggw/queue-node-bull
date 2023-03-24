module.exports = (job, done) => {
  const { eventValidation } = require('../queues');
  try {
    const { name, age } = job.data;

    job.progress(50);

    if (age < 18) throw new Error('You cannot access');

    setTimeout(() => {
      job.progress(100);
    }, 3000)

    eventValidation.add({ name, age, validated: true });
    done(null, job.data);
  } catch (error) {
    done(error);
  }
};
