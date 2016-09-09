var express = require('express');
var bodyParser = require('body-parser');
var parseXbrl = require('parse-xbrl');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/../front/build'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/parse-string', function (req, res) {
  parseXbrl.parseStr(req.body.data).then(function(json) {
    res.status(200).send({"response" : json});
  })
  .catch(function(err) {
    res.status(500).send({"error" : err});
  });
});

app.get('/sample-doc', function (req, res) {
  fs.readFile('./back/sampleDoc.xml', 'utf8', function(err, file) {
    if (!err) {
      res.status(200).send({"response" : file});
    } else {
      res.status(500).send({"error" : err});
    }
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('XBRL to JSON listening on port %d!', this.address().port);
});
