const { eventValidation } = require('../../queues');
module.exports = {
  getAll: async (req, res) => {
    const total = await eventValidation.getCompletedCount();

    res.send({ total });
  },
};
