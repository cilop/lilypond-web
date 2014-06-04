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

  app.get('/getzip', function(req, res){

    console.log('Serving file at: ' + config.root + '/dist.zip');
    res.download(config.root + '/troll.txt', 'troll.txt', function(err){
      err = err || 'File Sent Ok';
      console.log(err);

    });
   
    // res.setHeader('Content-disposition', 'attachment; filename=app.zip');
    // res.setHeader('Content-Type', 'application/zip');

    // fs.readFile(config.root + '/dist.zip', function(err, data){
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.end(data.toString());
    //     console.log('Sent');
    //   }
    // });
    
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