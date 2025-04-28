import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.config'

const Comment = sequelize.define(
	'Comments',
	{
		id: {
			type: DataTypes.INTEGER,
            primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		post_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
	},
	{
		tableName: 'comments',
		timestamps: true,
	},
)

export { Comment }
