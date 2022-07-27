const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const inspection = require('../models/inspection.model')
const Registration_inspection_childModel = require('./registration_inspection_child.model');
class Registration_inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspectionModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  inspection_id: {
      type: DataTypes.INTEGER
  },
  registration_id : {
      type: DataTypes.INTEGER
  },
  type:{
      type:DataTypes.BOOLEAN,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
//inspection_category
  category_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(20),
      allowNull: false
  }
}, {
  sequelize,
  modelName: 'registration_inspection',
  tableName: 'registration_inspection',
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
  //findOne da yoki findAll da chaqirish kerak
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    } 
  }
});
Registration_inspectionModel.hasMany(Registration_inspection_childModel, {as: 'registration_inspection_child', foreignKey: 'id'});
Registration_inspectionModel.hasMany(inspection, {as: 'inspection', foreignKey: 'id'})
module.exports = Registration_inspectionModel;