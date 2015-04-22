var execOptions = process.argv.splice(2, process.argv.length);

var cucumberjs    = require('cucumber'),
    configuration = cucumberjs.Cli.Configuration(execOptions),
    runtime       = cucumberjs.Runtime(configuration),
    formatter     = new cucumberjs.Listener.JsonFormatter();

formatter.log = function (results) {
  // if we have an IPC channel, use it to send JSON to the parent process
  if (process.send) {
    process.send(results);
  }
};

runtime.attachListener(formatter);
runtime.attachListener(configuration.getFormatter());

runtime.start(function (pass) {
  process.exit(pass ? 0 : 2);
});