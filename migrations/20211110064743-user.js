'use strict';

// const { DataTypes } = require("sequelize/dist");

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
  return db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    user_name: {
      type: 'string',
      length: 50,
      notNull: true
    },
    password:{
        type: 'string',
        notNull: true
    },
    token: {
      type: 'string',
      length: 100,
      // notNull: true
    },
    role: {
      type: 'enum',
      length: " 'doctor','register','cashier','inspector'",
      notNull: false
    },
    room_id: {
      type: 'int',
      notNull: true
    },
    doctor_id: {
      type: 'int',
      notNull: true
    },
    inspection_category_id:{
      type: 'int',
      notNull: true
    },
    pay_type:{
      type: 'enum',
      length: "'salary', 'parcent'",
      notNull: true
    },
    salary:{
      type: 'decimal',
      notNull: true
    },
  });
};

exports.down = function(db) {
  return db.dropTable('user');
};

exports._meta = {
  "version": 1
};
