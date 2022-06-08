const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const Registration_doctorModel = require('./registration_doctor.model');
const Registration_filesModel = require('../models/registration_files.model')
const Registration_inspectionModel = require('../models/registration_inspection.model')
const Registration_inspection_childModel = require('../models/registration_inspection_child.model')
const Registration_payModel = require('../models/registration_pay.model')
const Registration_recipeModel = require('../models/registration_recipe.model');
const UserModel = require('./user.model');
const patientModel = require('./patient.model');
const Register_kassaModel = require('./register_kassa.model');
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
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Math.floor(new Date().getTime() / 1000)

},
updated_at : {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Math.floor(new Date().getTime() / 1000)
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
   
});
RegistrationModel.hasMany(Registration_doctorModel, {as: 'registration_doctor', foreignKey: 'registration_id'})
RegistrationModel.hasMany(Registration_inspectionModel, {as: 'registration_inspection', foreignKey: 'registration_id'})
RegistrationModel.hasMany(Register_kassaModel, {as: 'register_kassa', foreignKey: 'doctor_id'})
module.exports = RegistrationModel;