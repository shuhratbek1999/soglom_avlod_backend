'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `inspection_info` (`id`, `name`) VALUES \
   (1, 'Болезни век, слезных путей и глазницы'),\
   (2, 'Болезни конъюнктивы'),\
   (3, 'Болезни склеры, роговицы, радужной оболочки и цилиарного тела'),\
   (4, 'Болезни хрусталика'),\
   (5, 'Болезни сосудистой оболочки и сетчатки'),\
   (6, 'Глаукома'),\
   (7, 'Болезни стекловидного тела и глазного яблока'),\
   (8, 'Болезни зрительного нерва и зрительных путей'),\
   (9, 'Болезни мышц глаза, нарушения содружественного движения глаз, аккомодации и рефракции'),\
   (10, 'Зрительные расстройства и слепота'),\
   (11, 'Другие болезни глаза и его придаточного аппарата')"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
