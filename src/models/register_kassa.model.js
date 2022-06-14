const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Register_kassaModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Register_kassaModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 type: {
   type: DataTypes.STRING(40),
   allowNull: false
 },
 price:{
   type: DataTypes.DECIMAL(12, 2),
   allowNull: false
 },
 pay_type:{
   type: DataTypes.STRING,
   allowNull: false
 },
 doctor_id:{
   type: DataTypes.INTEGER
 }

}, {
  sequelize,
  modelName: 'register_kassa',
  tableName: 'register_kassa',
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

module.exports = Register_kassaModel;