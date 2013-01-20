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
setInterval(updateReading, 100);

var app = express();
var httpServer = http.createServer(app);
var sockServer = sio.listen(httpServer);

app.use("/update/", function(req, res, next){
    console.log("Temperature requested");
    res.setHeader('Content-type','application/json');
    res.end(JSON.stringify(lastReading));
});
app.use(express.static(__dirname + '/docs'));

sockServer.on('connection', function(client) {
    var repeat = setInterval(function(){
        client.emit('update', lastReading);
    }, 100);
    client.on('disconnect', function(){
        clearInterval(repeat);
    });
});

httpServer.listen(80);