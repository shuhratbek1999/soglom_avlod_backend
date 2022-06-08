const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Register_inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Register_inspectionModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.DATE,
   allowNull: true
 },
 type: {
   type: DataTypes.STRING(40),
   allowNull: false
 },
 price:{
   type: DataTypes.DECIMAL(12, 2),
   allowNull: false
 },
 doc_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
 user_id:{
  type: DataTypes.INTEGER,
  allowNull: false
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

module.exports = Register_inspectionModel;