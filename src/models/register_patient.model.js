const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const BemorModel = require('../models/patient.model')
class registerPatientModel extends Model {
  toJSON() {
    var values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  }
}

registerPatientModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.INTEGER(),
  },
  doc_id: {
    type: DataTypes.INTEGER(),
  },
  summa: {
    type: DataTypes.DECIMAL(17,2),
    allowNull: false
  },
  registration_id: {
    type: DataTypes.INTEGER()
  },
  datetime: {
    type: DataTypes.INTEGER()
  },
  type: {
    type: DataTypes.INTEGER(),
    allowNullL: true
  },
  place:{
    type: DataTypes.STRING()
  },
  doc_type:{
    type: DataTypes.STRING()
  }

}, {
  sequelize,
  modelName: 'registerPatientModel',
  tableName: 'register_patient',
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

registerPatientModel.belongsTo(BemorModel, {as:'patient', foreignKey:'patient_id'})

module.exports = registerPatientModel;