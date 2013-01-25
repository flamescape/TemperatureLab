var http = module.require('http');
var express = require('express');
var sio = module.require('socket.io');
var util = module.require('util');
var thermometer = module.require('thermometer_test')

var lastReading = [];
function updateReading() {
    lastReading = thermometer.read();
    console.log(lastReading);
}
setInterval(updateReading, 1000);

var app = express();
var httpServer = http.createServer(app);
var sockServer = sio.listen(httpServer);

app.use(express.static(__dirname + '/web'));

sockServer.on('connection', function(client) {
    var repeat = setInterval(function(){
        client.emit('update', lastReading);
    }, 1000);
    client.on('disconnect', function(){
        clearInterval(repeat);
    });
});

httpServer.listen(8080);
