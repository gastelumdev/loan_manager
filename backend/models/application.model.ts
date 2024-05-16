import { sequelize } from "./db";
import { Model, DataTypes } from 'sequelize';

export class Application extends Model { };
Application.init({
    organization: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'application' });