const moment = require('moment');

module.exports = (app) => {
  const getTasks = (req, res) => {
    const date = req.query.date ? req.query.date : moment().endOf('day').toDate();
    app.db('tasks')
      .where({userId: req.user.id})
      .where('estimateAt', '<=', date)
      .orderBy('estimateAt')
      .then((tasks) => res.json(tasks))
      .catch((e) => {
        res.status(500).json(e);
      });
  };

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      res.status(400).send('Descrição é um campo obrigatorio!');
      return;
    }

    req.body.userId = req.user.id;

    app.db('tasks')
      .insert(req.body)
      .then((_) => res.status(204).send())
      .catch((e) => res.status(500).json(e));
  };

  const remove = (req, res) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .del()
      .then((rowsDelete) => {
        if (rowsDelete > 0) {
          res.status(204).send();
        } else {
          res.status(400).send(`Não foi encontrada task com id ${req.params.id}`);
        }
      })
      .catch((e) => res.status(500).json(e));
  };

  const updateTaskDoneAt = (req, res, doneAt) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .update({doneAt})
      .then((_) => res.status(400).send())
      .cache((err) => res.status(400).json(err));
  };

  const toggleTask = (req, res) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .first()
      .then((task) => {
        if (!task) {
          res.status(400).send(`Task com id ${req.params.id} não existe para usuário atual.`);
          return;
        }
        const doneAt = task.doneAt ? null : new Date();
        updateTaskDoneAt(req, res, doneAt);
      });
  };

  return {getTasks, save, remove, toggleTask};
};
