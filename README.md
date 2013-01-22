Temperature Lab
---------------

### Installation & Usage

Prerequisite: a Raspberry Pi with installed OS. We recommend the Raspberry Pi Educational Linux Distro from Adafruit: [Occidentalis v0.2](http://learn.adafruit.com/adafruit-raspberry-pi-educational-linux-distro/occidentalis-v0-dot-2). It has built-in support for [One Wire](http://learn.adafruit.com/adafruit-raspberry-pi-educational-linux-distro/occidentalis-v0-dot-1#one-wire-support)

#### Installing node.js:

**Step 1**: Download the latest stable version of node.js

`~ $ wget http://nodejs.org/dist/v0.8.18/node-v0.8.18-linux-arm-pi.tar.gz`

**Step 2**: Unzip and remove superfluous files

`~ $ cd /usr/local`
`/usr/local $ sudo tar xzvf ~/node-v0.8.18-linux-arm-pi.tar.gz --strip=1`
`/usr/local $ sudo rm LICENSE`
`/usr/local $ sudo rm README.md`
`/usr/local $ sudo rm ChangeLog`


#### Cloning the repository and installing modules
`/usr/local $ cd ~`
`~ $ git clone https://github.com/flamescape/TemperatureLab.git`
`~ $ cd TemperatureLab`
`~ $ npm install socket.io`
`~ $ npm install express`

#### Running the server
`~ $ node server.js`
Direct your web browser to http://localhost/ to view the lab.
