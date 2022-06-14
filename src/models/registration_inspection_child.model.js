const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Registration_inspection_childModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspection_childModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
//registration inspection
  parent_id: {
      type: DataTypes.INTEGER
  },
  text : {
      type: DataTypes.STRING,
      allowNull: false
  },
  norm:{
      type: DataTypes.STRING(60),
      allowNull: false
  },
  name:{
      type: DataTypes.STRING(60),
      allowNull: false
  },
  registration_id:{
      type: DataTypes.INTEGER
  },
  status:{
      type: DataTypes.STRING(20),
      allowNull: false
  },
  price:{
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
  },
  checked:{
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  file:{
      type: DataTypes.STRING(100),
      allowNull: false
  }
}, {
  sequelize,
  modelName: 'registration_inspection_child',
  tableName: 'registration_inspection_child',
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

module.exports = Registration_inspection_childModel;