#!/usr/bin/env node

/*jslint node: true, white: false */
var fs = require('fs'),
    lineReader = require("line-reader");
    RedisProtocol = require('./RedisProtocol');

if (process.argv.length < 3) {
    console.error('USAGE: redis-mass INPUTFILE [OUTPUTFILE]');
    process.exit(1);
}

var inputfile = process.argv[2],
    outputfile = process.argv[3];

if (outputfile)
{
    fs.writeFileSync(outputfile, "");
}

lineReader.eachLine(inputfile, function(line, last) {

  var protocol = RedisProtocol.encode(line);

  if (outputfile) {
      fs.appendFileSync(outputfile, protocol);
  } else {
      if (last)
      {
          protocol = protocol.trim() + "\r";
      }

      console.log(protocol);
  }

  if (last)
  {
      return false;
  }
});
