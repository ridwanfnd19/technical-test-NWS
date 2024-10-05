import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/postgres/pool';

class CategoryModel extends Model {
    public id!: string;
    public name!: string;
}

CategoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    sequelize,
    tableName: 'Categories',
    timestamps: false,
});

export default CategoryModel;
