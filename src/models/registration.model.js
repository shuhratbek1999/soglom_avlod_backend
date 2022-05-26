const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class RegistrationModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

RegistrationModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
},
created_at : {
    type: DataTypes.INTEGER,
    allowNull: false
},
updated_at : {
    type: DataTypes.INTEGER,
    allowNull: false
},
status : {
    type: DataTypes.STRING(20),
    allowNull: false
},
patient_id : {
    type: DataTypes.INTEGER,
    allowNull: false
},
type_service : {
    type: DataTypes.STRING(20),
    allowNull: false
},
complaint : {
    type: DataTypes.STRING,
    allowNull: false
},
summa : {
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
},
pay_summa : {
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
},
backlog : {
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
},
discount : {
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
},

}, {
  sequelize,
  modelName: 'registration',
  tableName: 'registration',
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

module.exports = RegistrationModel;