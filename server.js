var http = module.require('http');
var express = require('express');
var io = module.require('socket.io');
var util = module.require('util');
var sqlite3 = require('sqlite3').verbose();
var thermometers = module.require('thermometers');

var app = express();
var httpServer = http.createServer(app);
var sockServer = io.listen(httpServer, {log: false});
var db = new sqlite3.Database('db.sql');

var thermoLab = new thermometers.ThermometerLab('/sys/bus/w1/devices/');

app.use(express.static(__dirname + '/web'));

db.serialize(function() {
  db.run("CREATE TABLE temps (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
});

db.close();

sockServer.on('connection', function(client) {
    var onNewThermometer = function(t){
        ['tConnect', 'tData', 'tFail', 'tDisconnect'].forEach(function(evt){
            t.on(evt, function(data) { client.emit(evt, data); });
        });
    };

    var devs = thermoLab.getDevices();
    for (var d in devs) { onNewThermometer(devs[d]); } // Relay all currently connected thermometers.
    thermoLab.on('connect', onNewThermometer); // Relay all future connected thermometers.
    client.once('disconnect', function(){ // Remove event listener when client disconnects.
        thermoLab.removeListener('connect', onNewThermometer);
    });
});

httpServer.listen(8080);
