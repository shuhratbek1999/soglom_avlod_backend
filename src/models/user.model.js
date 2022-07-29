const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const RoomModel  = require('../models/room.model')
const DoctorModel = require('../models/doctor.model')
const InspectionModel  = require('../models/inspector_category.model')
class UserModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

UserModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING(50), 
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  token:{
    type: DataTypes.STRING(100),
    allowNull: false
  },
  room_id:{
    type: DataTypes.INTEGER,
    // allowNull: false
  },
  doctor_id:{
    type: DataTypes.INTEGER
  },
  inspection_category_id:{
    type: DataTypes.INTEGER
  },
  pay_type:{
    type: DataTypes.ENUM('salary', 'percent'),
    allowNull: true
  },
  salary:{
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: true
  },
  percent:{
    type: DataTypes.DECIMAL(10,2)
  }
 
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
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
  // findOne da yoki findAll da chaqirish kerak
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] },
    }
  }
});

UserModel.belongsTo(RoomModel, { as: 'Room', foreignKey: 'room_id'})
UserModel.belongsTo(DoctorModel, {as: 'doctor', foreignKey: 'doctor_id'})
UserModel.belongsTo(InspectionModel, {as: 'inspecton', foreignKey: 'inspection_category_id'})
module.exports = UserModel;