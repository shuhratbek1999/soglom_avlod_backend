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
      length: 100,
      notNull: true
    },
    name: {
      type: 'string',
      length: 30,
      notNull: true
    },
    lastname: {
      type: 'string',
      length: 30,
      notNull: true
    },
    patronymic: {
      type: 'string',
      length: 40,
      notNull: true
    },
    region_id:{
      type: 'int'
    },
    district_id:{
      type: 'int'
    },
    phone:{
      type: 'string',
      length: 20,
      notNull: true
    },
    passport:{
      type: 'string'
    },
    addres:{
      type: 'string'
    },
    gender:{
      type: 'string',
      length: 10,
      notNull: true
    },
    birthday:{
      type: 'string',
      notNull: true
    },
  })
};

exports.down = function(db) {
  return db.dropTable('patient');
};

exports._meta = {
  "version": 1
};
