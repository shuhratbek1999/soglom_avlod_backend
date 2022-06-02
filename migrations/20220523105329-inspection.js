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
  return db.createTable('inspection', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    name:{
      type: 'string',
      length: 100,
      notNull: true
    },
    parent_id:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal(17,2)',
      notNull: true
    },
    type:{
      type: 'boolean',
      notNull: true
    },
    user_id:{
      type: 'int',
      notNull: true
    },
    category_id:{
      type: 'int',
      notNull: true
    },
    percent_bonus:{
      type: 'decimal(5, 2)',
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable('inspection');
};

exports._meta = {
  "version": 1
};
