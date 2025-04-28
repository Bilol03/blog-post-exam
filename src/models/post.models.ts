import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const Post = sequelize.define(
	'Post',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
            primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		}
	},
	{
		tableName: 'posts',
		timestamps: true,
	},
)

export { Post }
