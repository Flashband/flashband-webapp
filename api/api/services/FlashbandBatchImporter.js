var parse = require('csv-parse');
var transform = require('stream-transform');
var q = require('q');

//var fs = require('fs');
//var parse = require('csv-parse');
//var transform = require('stream-transform');

//var output = [];
//var parser = parse({delimiter: ':'})
//var input = fs.createReadStream('/etc/passwd');
//var transformer = transform(function(record, callback){
  //setTimeout(function(){
    //callback(null, record.join(' ')+'\n');
  //}, 500);
//}, {parallel: 10});
//input.pipe(parser).pipe(transformer).pipe(process.stdout);


module.exports = {
  parse: function(input) {
    var defer = q.derfer();
    var parser = parse({delimiter: ':'});
    var transformer = transform(function(record, callback){
    });
    input.pipe(parser).pipe();
    return defer.promise;
  }
};
