/*
 * metalsmith-kalastatic-dot-module
*/

'use strict';

var request = require("request");

module.exports = function plugin(opts) {

    opts = opts || {};

    var stylesURL = opts.stylesURL,
        scriptsURL = opts.scriptsURL,
        base = opts.base || '',
        removeBase = opts.removeBase || false;

    return function through (files, metalsmith, done) {

      function requestResource(url,cb) {
        request(url, function(err,res,bod){
          if( !err && res.statusCode === 200 ) {
            cb(bod);
          } else {
            console.log(err);
            cb(err);
          }
        });
      }

      function asyncDone(done){
        if(metadata.kstatic.styles && metadata.kstatic.scripts) {
          done();
        }
      }

      var metadata = metalsmith.metadata();
      metadata.kstatic = {};
      requestResource(base + stylesURL, function(res){
          // Remove the base URL from the styles.
          if (base !== '' && removeBase) {
              res = res.replace(new RegExp(base, 'g'), '');
          }
          metadata.kstatic.styles = res.replace(base, '');
          asyncDone(done);
      });
      requestResource(base + scriptsURL, function(res){
        // Remove the base URL from the scripts.
        if (base !== '' && removeBase) {
            res = res.replace(new RegExp(base, 'g'), '');
        }
        metadata.kstatic.scripts = res.replace(base, '');
        asyncDone(done);
      });


    };
}
