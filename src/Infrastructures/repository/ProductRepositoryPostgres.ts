import ProductRepository from "../../Domains/product/ProductRepository";
import ProductModel from "./models/ProductModel";
import CategoryModel from "./models/CategoryModel";

class ProductRepositoryPostgres extends ProductRepository {
    async addProduct(product: any) {
        const { name, desc, image, category_id }  = product;
        const createdProduct = await ProductModel.create({ name, desc, image, category_id });
        return createdProduct;
    }

    async getAllProduct(): Promise<any> {
        const products = await ProductModel.findAll({ 
            attributes: ['name', 'desc', 'image'],
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name'],
            }],
        })
        return products
    }

    async getProductById(id: string): Promise<any> {
        const products = await ProductModel.findByPk(id, {
            attributes: ['name', 'desc', 'image'],
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name'],
            }],
        })
        return products
    }

    async updateProduct(payload: any): Promise<any> {
        await ProductModel.update(
            {
                name: payload.name,
                desc: payload.desc,
                image: payload.image,
                category_id: payload.category_id,
            },
            {
                where: {
                    id: payload.id
                }
            }
        )
    }

    async deleteProduct(id: string): Promise<any> {
        await ProductModel.destroy({
            where: {
                id
            }
        })
    }
}

export default ProductRepositoryPostgres