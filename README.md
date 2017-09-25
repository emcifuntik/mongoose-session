# mongoose-session2

Express 5 Middleware for MongoDB Session Storage using the Mongoose ODM

## Installation
```bash
npm install mongoose-session2
```
    
## Usage
```javascript
const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

const app = express();

app.use(require('express-session')({
    key: 'session',
    secret: 'SUPER SECRET SECRET',
    store: require('mongoose-session2')(mongoose)
}));
```

## Options

mongoose-session accepts options as a second parameter.

* `options.ttl` : allowed time of inactivity before a session is destroyed, in seconds (1209600)
* `options.modelName` : specifies the name of the collection, defaults to 'session'
