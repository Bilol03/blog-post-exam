import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const BlogUser = sequelize.define(
	'BlogUser',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'bloguser',
		timestamps: true,
	},
)

export { BlogUser }
