const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class pastavchikModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

pastavchikModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(600),
    allowNull: false
},

}, {
  sequelize,
  modelName: 'pastavchik',
  tableName: 'pastavchik',
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
module.exports = pastavchikModel;