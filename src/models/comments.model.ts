import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db.config'

export class Comment extends Model {}

Comment.init(
	{
		id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
		comment: { type: DataTypes.STRING, allowNull: false },
		user_id: { type: DataTypes.BIGINT, allowNull: false },
		post_id: { type: DataTypes.BIGINT, allowNull: false },
	},
	{ sequelize, modelName: 'comment' },
)
