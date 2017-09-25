const Store = require('express-session').Store;

class MongooseSession extends Store {
  constructor(mongoose, options) {
    options = options || {};
    options.modelName = options.modelName || 'session';
    options.ttl = options.ttl || 1209600;

    this.mongoose = mongoose;

    const sessionSchema = new mongoose.Schema({
      _id: String,
      session: mongoose.Schema.Types.Mixed,
      createdAt: {
        type: Date
      },
      expires: {
        type: Date
      }
    });

    this.SessionModel = mongoose.model(options.modelName, sessionSchema);
  }

  get(sid, callback) {
    callback = callback || (() => {});
    this.SessionModel.findOne({
        _id: sid
      })
      .exec((err, results) => {
        if (err) {
          if (callback)
            callback(err);
        } else {
          if (results) {
            if (callback)
              callback(null, results.session);
          } else {
            if (callback)
              callback(null);
          }
        }
      });
  }

  set(sid, session, callback) {
    let self = this;
    self.SessionModel.update({
        _id: sid
      }, {
        _id: sid,
        session: session,
        createdAt: new Date()
      }, {
        upsert: true
      },
      (err) => {
        if (err) {
          console.error(err);
          if (callback)
            callback(err);
        } else {
          if (callback)
            callback(null);
        }
      });
  }

  destroy(sid, callback) {
    this.SessionModel
    .remove({
      _id: sid
    })
    .exec((err, results) => {
      if (err) {
        if (callback)
          callback(err);
      } else {
        if (callback)
          callback(null);
      }
    });
  }

  length(callback) {
    this.SessionModel
    .find()
    .exec((err, results) => {
      if (err) {
        console.error(err);
        if(callback)
          callback(err);
      } else {
        if(callback)
          callback(null, results.length);
      }
    });
  }

  clear(callback) {
    let self = this;
    self.SessionModel
    .remove()
    .exec((err, results) => {
      if (err) {
        if (callback)
          callback(err);
      } else {
        if (callback)
          callback(null);
      }
    });
  };
}