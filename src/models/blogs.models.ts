import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export class Blog extends Model {}

Blog.init(
	{
		id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
		blog_name: { type: DataTypes.STRING, allowNull: false },
	},
	{ sequelize, modelName: 'blog' },
)
