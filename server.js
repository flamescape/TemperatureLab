var config = module.require('./config'),
    http = module.require('http'),
    express = require('express'),
    io = module.require('socket.io'),
    util = module.require('util'),
    sqlite3 = require('sqlite3').verbose(),
    thermometers = module.require('thermometers');

var app = express(),
    httpServer = http.createServer(app),
    sockServer = io.listen(httpServer, {log: false}),
    db = new sqlite3.Database(config.database);

// Setup thermolab and start logging
var thermoLab = new thermometers.ThermometerLab(config.thermometerLab.devicesPath);
var thermoLogger = new thermometers.ThermometerLogger(thermoLab, db);

// Setup web interface
app.use(express.static(__dirname + '/web'));
sockServer.on('connection', function(client) {
    var onNewThermometer = function(t){
        ['tConnect', 'tData', 'tFail', 'tDisconnect'].forEach(function(evt){
            t.on(evt, function(data) { client.emit(evt, data); });
        });
    };

    var devs = thermoLab.getDevices();
    for (var d in devs) {
        onNewThermometer(devs[d]);  // Relay all currently connected thermometers.
        thermoLogger.getSensorLog(devs[d].deviceId, 60*60, function(rows){ // Relay historical data for last hour
            client.emit('tData', rows);
        });
    }
    thermoLab.on('connect', onNewThermometer); // Relay all future connected thermometers.
    client.once('disconnect', function(){ // Remove event listener when client disconnects.
        thermoLab.removeListener('connect', onNewThermometer);
    });
});

httpServer.listen(config.webPort);
