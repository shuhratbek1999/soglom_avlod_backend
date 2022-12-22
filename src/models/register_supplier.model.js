const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_supplierModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_supplierModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
date_time : {
    type: DataTypes.INTEGER,
},
doc_id: {
    type: DataTypes.INTEGER,
    allowNull: false
},
summa: {
  type: DataTypes.DECIMAL,
  allowNull: false
},
doc_type: {
  type: DataTypes.STRING,
  allowNull: false
},
type:{
  type: DataTypes.BOOLEAN
}

}, {
  sequelize,
  modelName: 'register_supplier',
  tableName: 'register_supplier',
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
});
module.exports = register_supplierModel;