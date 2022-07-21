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
  return db.createTable('register_inspection', {
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
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    doc_id:{
      type: 'int'
    },
    user_id: {
      type: 'int'
    },
    inspection_id:{
      type: 'int'
    },
    inspection_category:{
      type: 'int',
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable('register_inspection');
};

exports._meta = {
  "version": 1
};
