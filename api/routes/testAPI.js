var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/home', function(req, res) {
  console.log('Inside Home Login');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(cardEntries));
});

router.post('/api/formDataReceive', function(req, res) {
  const newCard = {
    Name: req.body.nameVal,
    Date: req.body.dateVal,
    Flavor: req.body.flavorVal,
    Lick: req.body.lickVal,
    RoomTemp: req.body.roomTempVal,
    IceTemp: req.body.iceTempVal
  };
  fs.readFile('myjsonfile.json', 'utf8', function (err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
    obj.push(newCard);
    json = JSON.stringify(obj, null, 2); 
    fs.writeFile('myjsonfile.json', json, 'utf8', function(err, data) {
      res.send("HIT!")
    });
}});

});

router.get('/', function(req, res, next) {
  fs.readFile('myjsonfile.json', 'utf8', function (err, data){
    if (err){
        console.log(err);
    } else {
    res.json(data);
  }
  })

});
module.exports = router;
