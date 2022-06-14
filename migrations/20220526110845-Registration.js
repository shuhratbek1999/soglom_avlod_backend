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
  return db.createTable('registration', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    user_id:{
      type: 'int'
    },
    created_at:{
      type: 'date',
      notNull: true
    },
    updated_at:{
      type: 'date',
      notNull: true
    },
    status:{
      type: 'string',
      notNull: true,
      length: 20
    },
    patient_id:{
      type: 'int'
    },
    type_service:{
      type: 'int',
      notNull: true
    },
    complaint:{
      type: 'int',
      notNull: true
    },
    summa:{
      type: 'decimal',
      notNull: true,
      length: (11, 2)
    },
    pay_summa:{
      type: 'decimal',
      notNull: true,
      length: (11, 2)
    },
    backlog:{
      type: 'decimal',
      notNull: true,
      length: (11,2)
    },
    discount:{
      type: 'decimal',
      notNull: true,
      length: (11,2)
    }
})
} 

exports.down = function(db) {
  return db.dropTable('registration');
};

exports._meta = {
  "version": 1
};

