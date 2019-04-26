var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');

var bears = [];

router.route('/bears')
    .post(function(req, res) {
        var bear = {};
        bear.name = req.body.name;
        bears.push(bear);
        res.json({ message: 'Bear created!' });
});

router.route('/bears')
    .get(function(req, res) {
    res.send(bears); 
});

router.route('/bears/:id')
    .get(function(req, res) {
    id = req.params.id;
    res.send(bears[id]);
});

router.route('/bears/:id')
    .delete(function(req, res) {
    delete_index = req.params.id;
    bears.splice(delete_index, 1);
    res.send({ message: 'Bear delete!' });
});

router.route('/bears/:id')
    .put(function(req, res) {
    id = req.params.id;
    var update = req.body;
    bears[id] = update;
    res.send(bears[id]);
});

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);
app.listen(8000);