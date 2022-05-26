const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class Registration_doctorModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}
Registration_doctorModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  registration_id : {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  status:{
      type:DataTypes.STRING(20),
      allowNull: false
  },
  price:{
      type: DataTypes.DECIMAL(17,2),
      allowNull: false
  },
  text:{
type:DataTypes.STRING,
allowNull: false
}
}, {
  sequelize,
  modelName: 'registration_doctor',
  tableName: 'registration_doctor',
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

module.exports = Registration_doctorModel;