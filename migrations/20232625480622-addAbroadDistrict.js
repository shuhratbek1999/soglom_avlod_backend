'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function () {
  return sequelize.query(
    "INSERT INTO `district` (`id`, `region_id`, `name`) VALUES\
      (196, 15, 'Olmaota viloyati'),\
      (197, 15, 'Akmola viloyati'),\
      (198, 15, 'Aqto‘be viloyati'),\
      (199, 15, 'Olmaota shahri'),\
      (200, 15, 'Atirau viloyati'),\
      (201, 15, 'Sharqiy Qozog‘iston viloyati'),\
      (202, 15, 'Jambil viloyati'),\
      (203, 15, 'Qarag‘anda viloyati'),\
      (204, 15, 'Kostanay viloyati'),\
      (205, 15, 'Qizilo‘rda viloyati'),\
      (206, 15, 'Shimoliy Qozog‘iston viloyati'),\
      (207, 15, 'Nur-Sulton (Ostona)'),\
      (208, 15, 'Pavlodar viloyati'),\
      (209, 15, 'Chimkent shahri'),\
      (210, 15, 'Turkiston viloyati'),\
      (211, 15, 'G‘arbiy Qozog‘iston viloyati'),\
      (212, 16, 'Botken viloyati'),\
      (213, 16, 'Bishkek shahri'),\
      (214, 16, 'Chuy viloyati'),\
      (215, 16, 'Jalolobod viloyati'),\
      (216, 16, 'Norin viloyati'),\
      (217, 16, 'O‘sh shahri'),\
      (218, 16, 'O‘sh viloyati'),\
      (219, 16, 'Talas viloyati'),\
      (220, 16, 'Issiqko‘l viloyati'),\
      (221, 17, 'Dushanbe shahri'),\
      (222, 17, 'Sug‘d viloyati'),\
      (223, 17, 'Xatlon viloyati'),\
      (224, 17, 'Tog‘li Badaxshon avtonom viloyati (GBAO)')\
      "
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
