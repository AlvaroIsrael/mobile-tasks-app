const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (error, hash) => callback(hash));
    });
  };

  const save = (req, res) => {
    obterHash(req.body.password, (hash) => {
      const password = hash;
      app.db('users')
        .insert({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password,
        })
        .then((_) => {
          res.status(204)
            .send();
        })
        .catch((erro) => {
          res.status(400)
            .json(erro);
        });
    });
  };

  return {save};
};
