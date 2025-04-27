import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export class BlogUser extends Model {}

BlogUser.init(
	{
		id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
		user_id: { type: DataTypes.BIGINT, allowNull: false },
		blog_id: { type: DataTypes.BIGINT, allowNull: false },
		role: {
			type: DataTypes.ENUM('owner', 'editor', 'member'),
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'blogs_users' },
)
