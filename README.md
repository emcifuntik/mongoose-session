# mongoose-session

Express 4 Middleware for MongoDB Session Storage using the Mongoose ODM

## Installation

    npm install mongoose-session
    
## Usage

    var express = require('express');
    
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/db');
    
    var app = express();
    
    app.use(require('express-session')({
        key: 'session',
        secret: 'SUPER SECRET SECRET',
        store: require('mongoose-session')(mongoose)
    }));

## Options

mongoose-session accepts options as a second parameters.

* `options.ttl` : allowed time of inactivity before a session is destroyed, in seconds (3600)
* `options.modelName` : specifies the name of the collection, defaults to 'Session'
    
## Info

##### 14/03/2014
This works perfectly for my current use in projects, and requires no configuration. If your usage of mongoose-session would require any extra configuration to work properly, feel free to submit an issue or pull request, and I'll look over it and make any changes needed to be made for this to work for everyone. :)

##### 5/01/2015
I (chncdcksn) am no longer actively working on this project, and this project SHOULD NOT be considered ready for production in any way, shape, or form. It is recommended that you use connect-mongo ([GitHub](https://github.com/kcbanner/connect-mongo)|[NPM](https://www.npmjs.com/package/connect-mongo)) instead. However, pull requests for this project will be viewed and merged, but I will not be fixing any issues or adding any new features myself. If anyone wants to take over this project, feel free to email me.
