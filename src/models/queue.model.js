const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class QueueModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

QueueModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,  
    allowNull: false
},
room_id : {
    type: DataTypes.INTEGER,
},
patient_id : {
    type: DataTypes.INTEGER,
},
number : {
    type: DataTypes.INTEGER,
},
datetime: {
    type: DataTypes.INTEGER,
},
status: {
    type: DataTypes.STRING(20),
}

}, {
  sequelize,
  modelName: 'queue',
  tableName: 'queue',
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

module.exports = QueueModel;