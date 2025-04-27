import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export class User extends Model {}

User.init(
	{
		id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false },
		last_name: { type: DataTypes.STRING },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
	},
	{ sequelize, modelName: 'user' },
)
