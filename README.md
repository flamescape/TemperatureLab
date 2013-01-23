# Temperature Lab
---------------

## About
This is a Raspberry Pi-powered [node.js](http://nodejs.org/) application that reports the temperatures from DS18B20 temperature sensors.

## Project Status
So far, this doesn't do anything except display a reading from a fake temperature sensor.

## Installation & Usage

Prerequisite: a Raspberry Pi with installed OS. We recommend the Raspberry Pi Educational Linux Distro from Adafruit: [Occidentalis v0.2](http://learn.adafruit.com/adafruit-raspberry-pi-educational-linux-distro/occidentalis-v0-dot-2). It has built-in support for [One Wire](http://learn.adafruit.com/adafruit-raspberry-pi-educational-linux-distro/occidentalis-v0-dot-1#one-wire-support). One or more [DS18B20](https://www.adafruit.com/products/374) sensors is probably a good thing to have for this but not required to get things up and running.

### Installing node.js:

**Step 1**: Download the latest stable version of node.js

```console
~ $ wget http://nodejs.org/dist/v0.8.18/node-v0.8.18-linux-arm-pi.tar.gz
```

**Step 2**: Unzip and remove superfluous files

```console
~ $ cd /usr/local
/usr/local $ sudo tar xzvf ~/node-v0.8.18-linux-arm-pi.tar.gz --strip=1
/usr/local $ sudo rm LICENSE
/usr/local $ sudo rm README.md
/usr/local $ sudo rm ChangeLog
```


### Cloning the repository and installing modules
```console
/usr/local $ cd ~
~ $ git clone https://github.com/flamescape/TemperatureLab.git
~ $ cd TemperatureLab
~ $ npm install socket.io
~ $ npm install express
```

### Running the server
```console
~ $ sudo node server.js
```
Direct your web browser to http://localhost/ on the RPi or to the  RPi's local IP address from a different machine on the network to view the lab.
