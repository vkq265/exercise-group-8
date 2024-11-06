'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            category.hasMany(sequelize.models.product, { foreignKey: 'category_id' });
        }
    }
    category.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        path: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'category',
        timestamps: true
    });
    return category;
}
