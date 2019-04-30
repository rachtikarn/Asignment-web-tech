var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');
var cors = require('cors');
bodyParser = require('body-parser');
var member = [];
app.use(cors());

var config = {
    apiKey: "AIzaSyDKh1vaXiNDUVZlu1Slm69pwnX8zNsaLZ4",
    authDomain: "assignment-web-tech-fff2c.firebaseapp.com",
    databaseURL: "https://assignment-web-tech-fff2c.firebaseio.com",
    projectId: "assignment-web-tech-fff2c",
    storageBucket: "assignment-web-tech-fff2c.appspot.com",
    messagingSenderId: "25892150442"
  };
  firebase.initializeApp(config);

router.route('/member')
    .post(function(req, res) {
        
        var database = firebase.database().ref('member/');
            database.child(req.body.Id).set({
                ID: req.body.Id,
                NAME: req.body.Name
          });
        res.json({ message: 'created!' });
});

router.route('/member')
    .get(function(req, res) {
   // var id = req.params.id;
    var memberRef = firebase.database().ref('member/');
        memberRef.on('value', function(snapshot) {
        res.send(snapshot.val());
        });
});

router.route('/member/:id')
    .get(function(req, res) {
        id = req.params.id;
        var member = firebase.database().ref('/member/' + id).once('value').then(function(snapshot) {
            var memberAll = (snapshot.val() ||'ANOY');
            res.send(memberAll);
          });
});

router.route('/member/:id')
    .delete(function(req, res) {
    var delete_id = req.params.id;
    var member = firebase.database().ref('member/' + delete_id);
    member.remove();
    res.send({ message: 'delete!' });
});

router.route('/member/:id')
    .put(function(req, res) {
    var member_id = req.params.id;
    var update = {
        ID: req.body.Id,
        NAME: req.body.Name
    }
    var updateMB = {};
    var member = firebase.database().ref('member/');
    updateMB[member_id] = update;
    res.send(updateMB)
    return member.update(updateMB);
});

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);
app.listen(8000);