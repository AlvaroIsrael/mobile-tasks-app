const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const {authSecret} = require('../.env');

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400)
        .send('Dados incompletos');
      return;
    }

    const user = await app.db('users')
      .whereRaw('LOWER(email) = LOWER(?)', req.body.email)
      .first();

    if (!user) {
      res.status(400)
        .send('Dados invalidos.');
      return;
    }

    bcrypt.compare(req.body.password, user.password, (e, isMatch) => {
      if (e || !isMatch) {
        return res.status(401)
          .send();
      }
      const payload = {id: user.id};
      return res.json({
        name: user.name,
        email: user.email,
        token: jwt.encode(payload, authSecret),
      });
    });
  };
  return {signin};
};
