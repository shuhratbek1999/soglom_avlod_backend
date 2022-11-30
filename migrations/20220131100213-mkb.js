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

/* Promise-based version */
exports.up = function (db) {
  return db.createTable('mkb', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    name : {
      type: 'string',
      length:512
    },
    code:{
      type:'string',
      length:20
    },
    parent_id:{
      type:'int'
    },
    parent_code:{
      type:'string',
      length:20
    },
    node_count:{
      type:'int',
      defaultValue:0
    },
    additional_info:{
      type:'text'
    }

  });
};

exports.down = function (db) {
  return db.dropTable('mkb');
};

exports._meta = {
  "version": 1
};
