const { DataTypes, Model, VIRTUAL } = require('sequelize');
const { palata } = require('../controllers/admin-app/registration.controller1');
const sequelize = require('../db/db-sequelize');
const palataModel = require('../models/palata.model')
class registration_palataModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

registration_palataModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 palata_id: {
   type: DataTypes.INTEGER(40),
 },
 price:{
   type: DataTypes.DECIMAL(12, 2),
   allowNull: false
 },
 registration_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
total_price:{
  type: DataTypes.DECIMAL
},
date_do:{
  type: DataTypes.INTEGER
},
status: DataTypes.VIRTUAL,

}, {
  sequelize,
  modelName: 'registration_palata',
  tableName: 'registration_palata',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ],

});
palataModel.hasMany(registration_palataModel, {as: 'palatas', foreignKey: 'palata_id'});
module.exports = registration_palataModel;