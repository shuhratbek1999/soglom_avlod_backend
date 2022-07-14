'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('registration_pay', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    user_id:{
      type: 'int'
    },
    registration_id:{
      type: 'int'
    },
    pay_type:{
      type: 'int',
    },
    summa:{
      type: 'decimal',
      notNull: true,
      length: (17, 2)
    },
    date_time:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_pay');
};

exports._meta = {
  "version": 1
};
