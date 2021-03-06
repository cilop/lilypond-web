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

    console.log(req.body.format);
    
    fs.writeFile(config.root + '/track' + req.body.ts + req.body.format, req.body.data, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('Wrote file: ' + config.root + '/track' + req.body.ts + req.body.format);
        res.send(200);
      }
    });
  });

  app.post('/gettrack', function(req, res) {

    // console.log(req.body.format);
    var ts = req.body.ts;
    // console.log(ts);
    console.log(config.root + '/track' + ts + req.body.format);
    res.download(config.root + '/track' + ts + req.body.format, 'track' + req.body.format, function(err){
      err = err || 'Served file: ' + config.root + '/track' + req.body.ts + req.body.format;
      console.log(err);
      fs.unlink(config.root + '/track' + ts + req.body.format, function(err){
        err = err || 'Deleted file: ' + config.root + '/track' + req.body.ts + req.body.format;
        console.log(err);
      });
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