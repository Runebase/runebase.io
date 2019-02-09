const fs = require('fs')

exports.doge = function(req, res, next) {
  const calcPercent = function(v, t) {
    return 100*v/t;
  };

  fs.readFile('./public/db/dogeBalance', (err, data) => {
    if (err) throw err;
    const total = 1000000;
    res.dogeBalance = parseFloat(data).toString();
    res.dogeProgress = calcPercent(res.dogeBalance, total)+"%";
    next();
  });

}

