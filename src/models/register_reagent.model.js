const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_reagentModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_reagentModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
reagent_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
count: {
  type: DataTypes.DECIMAL,
  allowNull: false
},
summa:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
doc_id:{
  type: DataTypes.INTEGER,
  allowNull: false
},
date_time:{
  type: DataTypes.INTEGER,
  allowNull: false
}

}, {
  sequelize,
  modelName: 'register_reagent',
  tableName: 'register_reagent',
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
module.exports = register_reagentModel;