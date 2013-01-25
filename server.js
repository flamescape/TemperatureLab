var http = module.require('http');
var express = require('express');
var io = module.require('socket.io');
var util = module.require('util');
var thermometers = module.require('thermometers');

var app = express();
var httpServer = http.createServer(app);
var sockServer = io.listen(httpServer);

var thermoLab = new thermometers.ThermometerLab('/sys/bus/w1/devices/');

app.use(express.static(__dirname + '/web'));

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
