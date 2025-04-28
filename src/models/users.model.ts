import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		}
	},
	{
		tableName: 'users',
		timestamps: true,
	},
)

export { User }
