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
  return db.createTable('register_doctor', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    type:{
      type: 'string',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    doc_id:{
      type: 'int'
    },
    doctor_id: {
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('register_doctor');
};

exports._meta = {
  "version": 1
};
