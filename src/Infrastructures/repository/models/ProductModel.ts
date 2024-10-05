import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/postgres/pool';
import CategoryModel from './CategoryModel';

class ProductModel extends Model {
    public id!: string;
    public name!: string;
    public desc!: string;
    public image!: string;
    public category_id!: string;
}

ProductModel.init(
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
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: CategoryModel,
              key: 'id',
            },
        },
    }, {
    sequelize,
    tableName: 'Products',
    timestamps: false,
});

// Menambahkan relasi One-to-Many
CategoryModel.hasMany(ProductModel, {
    foreignKey: 'category_id',
    as: 'products', // Alias untuk relasi
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category', // Alias untuk kebalikannya
});

export default ProductModel;
