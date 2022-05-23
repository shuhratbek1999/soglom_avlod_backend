const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

inspectionModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
name: {
    type: DataTypes.STRING(100),
},
parent_id : {
    type: DataTypes.INTEGER,
},
price:{
    type: DataTypes.DECIMAL(17,2)
},
type:{
    type: DataTypes.BOOLEAN
},
user_id:{
    type: DataTypes.INTEGER
},
category_id:{
    type: DataTypes.INTEGER
},
percent_bonus:{
    type: DataTypes.DECIMAL(5,2)
}

}, {
  sequelize,
  modelName: 'inspection',
  tableName: 'inspection',
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

module.exports = inspectionModel;