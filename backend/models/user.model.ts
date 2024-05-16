import { sequelize } from "./db";
import { Model, DataTypes } from 'sequelize';

export class User extends Model { };
User.init({
    fullname: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'application' });