'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `region` (`id`, `name`) VALUES \
   (15, 'Qozog‘iston'),\
   (16, 'Qirg‘iziston'),\
   (17, 'Tojikiston')"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
