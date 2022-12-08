const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const expenseModel = require('../models/expense.model')
class kassaOrderModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

kassaOrderModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.STRING()
 },
 type: {
   type: DataTypes.INTEGER(400),
   allowNull: false
 },
 price:{
   type: DataTypes.DECIMAL(),
   allowNull: false
 },
 expense_id:{
   type: DataTypes.INTEGER,
   allowNull: false
 },
 pay_type:{
  type: DataTypes.STRING
},
comment:{
  type: DataTypes.STRING(50)
}

}, {
  sequelize,
  modelName: 'kassa_order',
  tableName: 'kassa_order',
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
kassaOrderModel.belongsTo(expenseModel, {as: 'expense', foreignKey: 'expense_id'})
module.exports = kassaOrderModel;