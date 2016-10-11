var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcryptAsync = Promise.promisifyAll(bcrypt);


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true, 
  initialize: function(params) {
    this.on('creating', function(model, attrs, options) {
      return bcryptAsync.genSaltAsync(10)
                        .then(function(salt) {
                          console.log(salt);
                          return bcryptAsync.hashAsync(model.get('password'), salt, null);
                        })
                        .then(function(hashedPassword) {
                          console.log(hashedPassword);
                          model.set('password', hashedPassword);
                        })
                        .catch(function(err) {
                          console.err('error: ', err);
                        });
    });
  }
});

module.exports = User;