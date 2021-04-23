const db  = require('../models');

exports.getAllUser = (req, res) => {
  db.users.findAndCountAll().then(result => {
    const data = {
      users : result.rows,
      totalData : result.count
    };
    res.json(data);
  });
}
