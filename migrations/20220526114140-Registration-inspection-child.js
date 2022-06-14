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
  return db.createTable('registration_inspection_child', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    parent_id:{
      type: 'int'
    },
    text:{
      type: 'string',
      notNull: true
    },
    norm:{
      type: 'string',
      notNull: true,
      length: 60
    },
    name:{
      type: 'string',
      notNull: true,
      length: 60
    },
    registration_id:{
      type: 'int'
    },
    status:{
      type: 'string',
      notNull: true,
      length: 20
    },
    price:{
      type: 'decimal',
      notNull: true,
      length: (17, 2)
    },
    checked:{
      type: 'boolean',
      notNull: true
    },
    file:{
      type: 'string',
      length: 100,
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_inspection_child');
};

exports._meta = {
  "version": 1
};
