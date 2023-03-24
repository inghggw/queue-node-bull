const { eventRegister } = require('../../queues');
module.exports = {
  register: async (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) return res.send('The age and name are require');

    await eventRegister.add({ name, age });

    res.send({
      message: `${name} has been added to the register event queue`
    });
  },
};
