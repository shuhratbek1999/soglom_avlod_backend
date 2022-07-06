const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const DoctorModel = require('./doctor.model');
class register_doctorModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

register_doctorModel.init({
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
   type: DataTypes.STRING(40)
 },
 price:{
   type: DataTypes.DECIMAL(12, 2)
 },
 doc_id:{
   type: DataTypes.INTEGER
 },
 doctor_id:{
  type: DataTypes.INTEGER
}

}, {
  sequelize,
  modelName: 'register_doctor',
  tableName: 'register_doctor',
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
register_doctorModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'id'})
module.exports = register_doctorModel;