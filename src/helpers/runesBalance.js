const fs = require('fs')

exports.doge = function(req, res, next) {
  const calcPercent = function(v, t) {
    return trim(100*v/t, 3);
  };
  function trim(number, precision){
    var array = number.toString().split(".");
    array.push(array.pop().substring(0, precision));
    var trimmedNumber =  array.join(".");
    console.log(trimmedNumber);
    return trimmedNumber;
  }

  fs.readFile('./public/db/runesBalance', (err, data) => {
    if (err) throw err;
    const total = 1000000;
    res.runesBalance = parseFloat(data).toString();
    res.runesProgress = calcPercent(res.runesBalance, total)+"%";
    next();
  });

}

