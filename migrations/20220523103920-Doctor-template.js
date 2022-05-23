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
  return db.createTable("Doctor_template", {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    doctor_id:{
      type: 'int'
    },
    complaint:{
      type: 'string'
    },
     name:{
       type: 'string'
     },
     medical_history:{
       type: 'string'
     },
     objective_vision:{
       type: 'string'
     },
     instrumental:{
       type: 'string'
     },
     diagnos:{
       type: 'string'
     },
     procedure:{
       type: 'string'
     },
    recommended:{
      type: 'string'
    },
    concomitant:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('Doctor_template');
};

exports._meta = {
  "version": 1
};
