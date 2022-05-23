const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class PatientModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

PatientModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
fullname:{
    type:DataTypes.STRING(100)
},
name: {
    type: DataTypes.STRING(30),
},
lastname: {
    type: DataTypes.STRING(30),
},
patronymic: {
    type: DataTypes.STRING(40),
},
region_id: {
    type: DataTypes.INTEGER,
},
district_id: {
    type: DataTypes.INTEGER,
},
phone:{
    type:DataTypes.STRING(20)
},
passport:{
    type:DataTypes.STRING(9)
},
address:{
    type:DataTypes.STRING
},
gender:{
    type:DataTypes.STRING(10)
},
birthday:{
    type:DataTypes.INTEGER
},

}, {
  sequelize,
  modelName: 'patient',
  tableName: 'patient',
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

module.exports = PatientModel;