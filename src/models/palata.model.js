const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const registration_palataModel = require('./registration_palata.model');
class palataModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

palataModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  price:{
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.BOOLEAN
  }

}, {
  sequelize,
  modelName: 'palata',
  tableName: 'palata',
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
// palataModel.hasMany(registration_palataModel, {as: 'registration_palata', foreignKey: 'palata_id'});
module.exports = palataModel;