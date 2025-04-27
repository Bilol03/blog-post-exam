import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const Blog = sequelize.define(
	'Blog',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		tableName: 'blogs',
		timestamps: true,
	},
)

export { Blog }
