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
  return db.createTable('patient', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    fullname:{
      type: 'string',
      length: 100
    },
    name: {
      type: 'string',
      length: 30
    },
    lastname: {
      type: 'string',
      length: 30
    },
    patronymic: {
      type: 'string',
      length: 40
    },
    region_id:{
      type: 'int'
    },
    district_id:{
      type: 'int'
    },
    phone:{
      type: 'string',
      length: 20
    },
    passport:{
      type: 'string',
      length: 9
    },
    addres:{
      type: 'string'
    },
    gender:{
      type: 'string',
      length: 10
    },
    birthday:{
      type: 'int'
    }
  })
};

exports.down = function(db) {
  return db.dropTable('patient');
};

exports._meta = {
  "version": 1
};
