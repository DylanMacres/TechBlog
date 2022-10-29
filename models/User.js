const { Model, DataTypes } = require('sequelize');
const bcyrpt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
    checkPassword(loginPass) {
        return bcyrpt.compareSync(loginPass, this.password);
    }
}



User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        hooks: {
          beforeCreate: async (newData) => {
            newData.password = await bcrypt.hash(newData.password, 10);
            return newData;
          },
          beforeUpdate: async (updatedData) => {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
            return updatedData;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
      }
    );
    
    module.exports = User;
    