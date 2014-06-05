'use strict';

var fs = require('fs');
var config = require('../lib/config/config');


var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.post('/savejson', function(req, res){
    console.log(typeof req.body.data);
    fs.writeFile(config.root + '/track.json', req.body.data, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('Saved file: ' + config.root + '/track.json');
        // res.redirect('/gettrack');
        res.send(200);
        // res.download(config.root + '/track.txt', 'track.txt', function(err){
        //   err = err || config.root + '/track.txt';
        //   console.log(err);
        // });
      }
    });
  });

  app.get('/gettrack', function(req, res) {
    res.download(config.root + '/track.json', 'track.json', function(err){
      err = err || config.root + '/track.json';
      console.log(err);
    });
  });

  app.post('/getzip', function(req, res){

    var os = req.body.os;
    var filename;

    if (os === 'Mac OS') {
      filename = '/osx.zip';
    } else if (os === 'Windows') {
      filename = '/win.zip';
    } else if (os === 'Linux') {
      filename = '/linux.zip';
    } else {
      res.redirect('/download');
    }

    res.download(config.root + filename, 'lilypondGUI.zip', function(err){
      err = err || 'File at ' + filename + ' sent!';
      console.log(err);

    });
    
  });

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};